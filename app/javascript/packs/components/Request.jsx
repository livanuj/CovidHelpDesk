import { Container, CssBaseline } from '@material-ui/core'
import React, { useMemo } from 'react'
import { useQuery } from 'react-query'
import { getFetch } from '../helpers/fetchApi'
import Table from './Table'

const Request = () => {
  const {data: requestList, isLoading} = useQuery('requests', () => fetchRequests())

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

  const fetchRequests = async () => {
    let url = '/api/v1/requests'
    let headers = {
      'Content-Type': 'application/json'
    }

    const { response, error } = await getFetch({url, headers})
    console.log(response)
    return response.body.data
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  console.log(requestList)
  return (
    <Container>
      <CssBaseline />
      <Table columns={columns} data={requestList} />
    </Container>
  )
}

export default Request;
