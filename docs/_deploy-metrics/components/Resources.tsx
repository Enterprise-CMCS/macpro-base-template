import * as UI from '@chakra-ui/react'
import { Resource } from '../lib/getAwsResources'
  import { ResourceTable } from './ResourceTable'
  
  export const Resources = ({data}: {data: Resource[]}) => {
    return (
      <UI.Container maxW='8xl'>
        <UI.Box
          bg="bg-surface"
          boxShadow={{ base: 'none', md: 'sm' }}
          borderRadius={{ base: 'none', md: 'lg' }}
        >
          <UI.Stack spacing="5">
            <UI.Box px={{ base: '4', md: '6' }} pt="5">
              <UI.Stack direction={{ base: 'column', md: 'row' }} justify="space-between">
                <UI.Text fontSize="lg" fontWeight="medium">
                  Resources
                </UI.Text>
                <UI.InputGroup maxW="xs">
                 
                  <UI.Input placeholder="Search" />
                </UI.InputGroup>
              </UI.Stack>
            </UI.Box>
            <UI.Box overflowX="auto">
              <ResourceTable data={data}/>
            </UI.Box>
          </UI.Stack>
        </UI.Box>
      </UI.Container>
    )
  }