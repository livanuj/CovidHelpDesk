import { Container, CssBaseline } from '@material-ui/core'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { getFetch } from '../helpers/fetchApi'
import AppLayout from './AppLayout'
import OfferHelpModal from './OfferHelpModal'
import RequestTabs from './RequestTabs'
import Table from './table/Table'

const fetchRequests = async (requestType) => {
  let request = {
    url: '/api/v1/requests',
    body: { requestType },
  }

  const { response, error } = await getFetch(request)
  if (error) {
    throw new Error(error)
  }
  return response.body.data
}

const Request = () => {
  const [helpModalOpen, setHelpModalOpen] = useState(false)
  const [currentTab, setCurrentTab] = useState('all')
  const [selectedItems, setSelectedItems] = useState([])

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
        Header: 'Urgency',
        accessor: 'urgency',
        width: 120
      },
      {
        Header: 'Request Type',
        accessor: 'requestType',
        width: 100
      },
      {
        Header: 'Name',
        accessor: 'name',
        width: 250
      },
      {
        Header: 'Address',
        accessor: 'address',
        width: 250,
      },
      {
        Header: 'Req',
        accessor: 'noOfRequirements',
        width: 50,
      },
      {
        Header: 'Date',
        accessor: d => {
          return moment(d.createdAt)
            .local()
            .format("MMM d, yyyy")
        },
        width: 100,
      }
    ],
    []
  )

  const handleClickOpen = () => {
    setHelpModalOpen(true);
  };

  const handleClose = () => {
    setHelpModalOpen(false);
  };

  const helpRequestHandler = items => {
    setSelectedItems(items)
    handleClickOpen()
  }
  
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
        <Table
          columns={columns}
          data={requestList}
          helpRequestHandler={helpRequestHandler}
        />
      </Container>
      {
        helpModalOpen ?
          <OfferHelpModal
            selectedItems={selectedItems}
            open={helpModalOpen}
            handleClose={handleClose}
          /> : null
      }
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
