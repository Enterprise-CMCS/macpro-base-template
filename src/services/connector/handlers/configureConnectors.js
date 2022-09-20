import * as connect from "./../../../libs/connect-lib";

const connectors = [
  {
    name: "source.jdbc.mmdl-dbo-1",
    config: {
      "connector.class": "io.confluent.connect.jdbc.JdbcSourceConnector",
      "tasks.max": 1,
      "connection.user": process.env.legacydbUser,
      "connection.password": process.env.legacydbPassword,
      "connection.url": `jdbc:oracle:thin:@${process.env.legacydbIp}:${process.env.legacydbPort}:${process.env.legacyDb}`,
      "topic.prefix": `${process.env.topicNamespace}aws.mmdl.cdc.`,
      "poll.interval.ms": 2000,
      "batch.max.rows": 1000,
      "table.whitelist":
        "MMDL.PLAN_BASE_WVR_TBL, MMDL.PLAN_WVR_RVSN_TBL, MMDL.PLAN_WVR_RVSN_VRSN_TBL, SHAREDDATA.GEO_US_STATE_TBL",
      mode: "timestamp+incrementing",
      "incrementing.column.name": "REPLICA_ID",
      "timestamp.column.name": "REPLICA_TIMESTAMP",
      "validate.non.null": false,
      "numeric.mapping": "best_fit",
      "key.converter": "org.apache.kafka.connect.json.JsonConverter",
      "key.converter.schemas.enable": false,
      transforms: "Cast,createKey,extractInt",
      "transforms.createKey.type":
        "org.apache.kafka.connect.transforms.ValueToKey",
      "transforms.createKey.fields": "REPLICA_ID",
      "transforms.extractInt.type":
        "org.apache.kafka.connect.transforms.ExtractField$Key",
      "transforms.extractInt.field": "REPLICA_ID",
      "transforms.Cast.type": "org.apache.kafka.connect.transforms.Cast$Value",
      "transforms.Cast.spec":
        "APLCTN_GEO_STATE_ID:int32, APLCTN_CO_WRKFLW_STUS_ID:int32, APLCTN_RO_WRKFLW_STUS_ID:int32, APLCTN_WRKFLW_STUS_ID:int32, PLAN_WVR_APLCTN_ID:int32, PLAN_WVR_DEMO_GRNT_SW:int32, PLAN_WVR_FLD_MPNG_ID:int32, PLAN_WVR_ID:int32, PLAN_WVR_RVSN_APRVL_PRD:int32, PLAN_WVR_RVSN_ID:int32, PLAN_WVR_RVSN_INIT_WVR_SW:int32, PLAN_WVR_RVSN_PRNT_ID:int32, PLAN_WVR_RVSN_VRSN_DTL_ID:int32, PLAN_WVR_RVSN_VRSN_ID:int32, REPLICA_ID:int32, SYS_ADD_USER_ID:int32, SYS_UPDT_USER_ID:int32",
    },
  },
  {
    name: "source.jdbc.mmdl-dbo-2",
    config: {
      "connector.class": "io.confluent.connect.jdbc.JdbcSourceConnector",
      "tasks.max": 1,
      "connection.user": process.env.legacydbUser,
      "connection.password": process.env.legacydbPassword,
      "connection.url": `jdbc:oracle:thin:@${process.env.legacydbIp}:${process.env.legacydbPort}:${process.env.legacyDb}`,
      "topic.prefix": `${process.env.topicNamespace}aws.mmdl.cdc.PLAN_WVR_VRSN_DTL_TBL`,
      "poll.interval.ms": 2000,
      "batch.max.rows": 1000,
      mode: "timestamp+incrementing",
      "incrementing.column.name": "REPLICA_ID",
      "timestamp.column.name": "REPLICA_TIMESTAMP",
      "validate.non.null": false,
      "numeric.mapping": "best_fit",
      "key.converter": "org.apache.kafka.connect.json.JsonConverter",
      "key.converter.schemas.enable": false,
      transforms: "Cast,createKey,extractInt",
      "transforms.createKey.type":
        "org.apache.kafka.connect.transforms.ValueToKey",
      "transforms.createKey.fields": "REPLICA_ID",
      "transforms.extractInt.type":
        "org.apache.kafka.connect.transforms.ExtractField$Key",
      "transforms.extractInt.field": "REPLICA_ID",
      "transforms.Cast.type": "org.apache.kafka.connect.transforms.Cast$Value",
      "transforms.Cast.spec":
        "PLAN_WVR_RVSN_VRSN_ID:int32, PLAN_WVR_RVSN_VRSN_DTL_ID:int32, PLAN_WVR_FLD_MPNG_ID:int32, SYS_UPDT_USER_ID:int32, REPLICA_ID:int32",
      query:
        "SELECT PLAN_WVR_RVSN_VRSN_ID, PLAN_WVR_RVSN_VRSN_DTL_ID, PLAN_WVR_FLD_MPNG_ID, APLCTN_CHG_TYPE_CD, SYS_ADD_TS, SYS_UPDT_TS, SYS_UPDT_USER_ID, REPLICA_ID, REPLICA_TIMESTAMP FROM MMDL.PLAN_WVR_VRSN_DTL_TBL",
    },
  },
];

async function myHandler(event, context, callback) {
  await connect.putConnectors(
    process.env.cluster,
    process.env.service,
    connectors
  );
  await connect.deleteConnectors(process.env.cluster, process.env.service, []);
  await connect.restartConnectors(
    process.env.cluster,
    process.env.service,
    connectors
  );
}

exports.handler = myHandler;
