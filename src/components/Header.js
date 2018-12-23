import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogOut } from '../actions/auth'


export const Header = ({ startLogOut }) => (
            <header>
                <h1>Expensify</h1>
                <ul>
                    <li>
                        <NavLink to="/dashboard" activeClassName="isActive">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/create" activeClassName="isActive">Create</NavLink>
                    </li>
                    <li><button onClick={startLogOut}>Log out</button></li>
                </ul>
            </header>
        )

const mapDispatchToProps = dispatch => ({
    startLogOut: () => dispatch(startLogOut())
})

export default connect(undefined, mapDispatchToProps)(Header)
