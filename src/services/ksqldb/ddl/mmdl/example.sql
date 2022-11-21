-- If we query when we are debugging we can accidentally advance the offset before running these creates
-- If so you need to drop the object, set the offset to earliest, then re-create
-- SET 'auto.offset.reset' = 'earliest';

-- Topic listed below is the source data
-- Struct needed to un-nest
-- these values are a partial representation of events found from the aws.mmdl.cdc.PLAN_BASE_WVR_TBL stream
-- by creating a "SOURCE" stream INSERT, DELETE TOPIC, and DROP STREAM statements aren't permitted
CREATE SOURCE STREAM IF NOT EXISTS mmdl_nested_stream (
    payload STRUCT<
        PLAN_WVR_ID INT,
        GEO_USPS_STATE_CD string,
        PLAN_WVR_GRP_TYPE_CD string,
        PLAN_WVR_PGM_TYPE_CD string>

   ) WITH (
     KAFKA_TOPIC = '${param:topicNamespace}aws.mmdl.mmdl.cdc.example.0', 
     VALUE_FORMAT = 'JSON',
     REPLICAS = 3
   );
   

-- Creating a table on top of this stream to store un-nested data
-- Table created as CTAS, so it's materialized in the topic listed below
-- RocksDB also storing this emphemerally on the ksqldb host
CREATE TABLE mmdl_tbl_queryable
  WITH (
        REPLICAS = 3,
        KAFKA_TOPIC = '${param:topicNamespace}ksqldb.mmdl.mmdl.cdc.example.0_Tbl_Queryable'
       )  as
    select
        payload->PLAN_WVR_ID as PLAN_WVR_ID,
        LATEST_BY_OFFSET(payload->GEO_USPS_STATE_CD) as GEO_USPS_STATE_CD,
        LATEST_BY_OFFSET(payload->PLAN_WVR_GRP_TYPE_CD) as PLAN_WVR_GRP_TYPE_CD,
        LATEST_BY_OFFSET(payload->PLAN_WVR_PGM_TYPE_CD) as PLAN_WVR_PGM_TYPE_CD
   from mmdl_nested_stream
group by payload->PLAN_WVR_ID
emit changes;

-- select * from mmdl_tbl_queryable limit 10;