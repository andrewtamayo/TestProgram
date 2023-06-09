import React from 'react';
import BasePage from "../../base/BasePage";
import {Layout, OffCanvas, Menu, Progress} from "nq-component";
import HomePage from "../home/HomePage";
import {getCurrentUserUseCase, signOutUseCase} from "../../usecases/user";
import {getSchemasUseCase} from "../../usecases/schema";
import MainPagePresenter from "./MainPagePresenter";
import Dashboard from '../dashboard/Dashboard';
import {Routes, Route} from 'react-router-dom';
import User from '../user/User';
import Subject from "../subject/Subject";

const employeeMenus = [
    {
        name: "Employees",
        route: '/employees'
    },
    {
        name: "Positions",
        route: '/employees'
    },
];
const courseMenus = [
    {
        name: "Subject",
        route: '/subject'
    },
    {
        name: "Teacher",
        route: '/teacher'
    },
];
const userMenus = [
    {
        name: "Users",
        route: '/users'
    },
    {
        name: "Roles",
        route: '/employees'
    },
    {
        name: "Test",
        route: '/Test'
    }
];
const groupMenus = [
    {
        name: "Subject",
        route: '/users'
    },
    {
        name: "Forum",
        route: '/forum'
    },
    {
        name: "Progress Chart",
        route: '/progressChart',
        icon: "bi bi-bar-chart"
    }
];

const menus = [
    {
        name: "Dashboard",
        icon: 'bi bi-layout-text-window-reverse',
        route: '/dashboard'

    },
    {
        name: "User Management",
        icon: "bi bi-person-lines-fill",
        route: userMenus,
    },
    {
        name: "Employee Management",
        icon: "bi bi-people-fill",
        route: employeeMenus,
    },
    {
        name: "Courses",
        icon: "bi bi-book",
        route: courseMenus,
    },
    {
        name: "Group",
        icon: "bi bi-people",
        route: groupMenus,
    },
];

class MainPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {progress: true};
        this.presenter = new MainPagePresenter(this, getCurrentUserUseCase(), signOutUseCase(), getSchemasUseCase());
    }

    componentDidMount() {
        // this.presenter.componentDidMount();
        
    }

    signOutClick() {
        this.presenter.signOutClick();
    }

    render() {
        const user = {name: 'Juan Dela Cruz', email: 'juan.dela.cruz@yahoo.com'};
        // const user = this.getCurrentUser();
        if (!user) {
            return (
                <Progress/>
            )
        }
        return (
            <Layout>
                <Layout.Context.Consumer>
                    {
                        (value =>
                                <OffCanvas
                                    onSetShow={value.setCollapse}
                                    show={value.collapsed}>
                                    <div className="offcanvas-body">
                                        <nav className="navbar-dark">
                                            <div className="text-center p-2">
                                                <img
                                                    className="w-50"
                                                    src="/assets/images/logo.svg"
                                                    style={{filter: 'invert(100%)'}}/>
                                                <div className="p-2 text-white">
                                                    <h6 className="m-0 text-truncate">{user.name}</h6>
                                                    <p className="text-truncate m-0">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                            <hr className="dropdown-divider bg-white"/>
                                            <Menu
                                                menus={menus}/>
                                        </nav>
                                    </div>
                                    <div className="my-2">
                                        <button
                                            className="nav-link text-muted btn btn-link"
                                            onClick={this.signOutClick.bind(this)}>
                                            <i className="bi bi-power"></i>
                                            <span className="ms-2 fw-bold small">Log out</span>
                                        </button>
                                    </div>
                                </OffCanvas>
                        )
                    }
                </Layout.Context.Consumer>

                <main className="vh-100 d-flex flex-column">
                    <HomePage></HomePage>

                    <Routes>
                        <Route path={'/dashboard'} element={<Dashboard/>}/>
                        <Route path={'/users'} element={<User/>}/>
                        <Route path={'/subject'} element={<Subject/>}/>
                    </Routes>
                </main>
            </Layout>
        )
    }
}

export default MainPage;
