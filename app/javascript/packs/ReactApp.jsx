// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from "react-query/devtools"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Request from './components/Request'
import { CssBaseline } from '@material-ui/core'

const queryClient = new QueryClient();

const ReactApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Request />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        closeOnClick
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

ReactApp.defaultProps = {
  name: 'David'
}

ReactApp.propTypes = {
  name: PropTypes.string
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ReactApp name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})
