import React from 'react'
import CategoryForm from "./../CategoryForm/CategoryForm"
import DepartmentForm from "./../DepartmentForm/DepartmentForm"
import { Tab } from 'semantic-ui-react'

const panes = [
    { menuItem: 'Department', render: () => <Tab.Pane><DepartmentForm/></Tab.Pane> },
    { menuItem: 'Category', render: () => <Tab.Pane><CategoryForm/></Tab.Pane> },
  ]

const ManageDepartCate=()=>{
    return (
        <div>
            <Tab panes={panes} />
        </div>
    )
}

export default ManageDepartCate
