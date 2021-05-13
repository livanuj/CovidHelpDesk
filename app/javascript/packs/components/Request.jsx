import { Container, CssBaseline } from '@material-ui/core'
import React, { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { getFetch } from '../helpers/fetchApi'
import AppLayout from './AppLayout'
import RequestTabs from './RequestTabs'
import Table from './Table'

const fetchRequests = async (requestType) => {
  let request = {
    url: '/api/v1/requests',
    headers: { 'Content-Type': 'application/json' },
    body: { requestType },
  }

  const { response, error } = await getFetch(request)
  if (error) {
    throw new Error(error)
  }
  return response.body.data
}


const Request = () => {
  const [currentTab, setCurrentTab] = useState('all')

  const {
    data: requestList,
    refetch,
    isLoading
  } = useQuery('requests', () => fetchRequests(currentTab))

  useEffect(() => {
    refetch()
  }, [currentTab])

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id'
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Request Type',
        accessor: 'requestType'
      },
      {
        Header: 'Urgency',
        accessor: 'urgency'
      },
      {
        Header: 'Address',
        accessor: 'address'
      },
      {
        Header: 'Requirements',
        accessor: 'noOfRequirements'
      },
      {
        Header: '',
        accessor: 'offerBtn'
      }
    ],
    []
  )
  
    const handleTabChange = newValue => {
      setCurrentTab(newValue)
    }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <AppLayout>
      <Container maxWidth="lg" style={styles.container}>
        <RequestTabs
          style={styles.requestTabs}
          value={currentTab}
          handleTabChange={handleTabChange}
        />
        <Table columns={columns} data={requestList} />
      </Container>
    </AppLayout>
  )
}

const styles = {
  container: {
    width: 'inherit',
    marginTop: 80,
    minHeight: '100vh',
    display: 'flex'
  },
  requestTabs: {
    position: 'fixed'
  }
}

export default Request;
