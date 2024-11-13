export default function Navbar() {
    return <>

        <nav className="navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <form className="navbar-search navbar-search-light form-inline mr-sm-3" id="navbar-search-main">
                        <div className="form-group mb-0">
                            <div className="input-group input-group-alternative input-group-merge">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-search"></i></span>
                                </div>
                                <input className="form-control" placeholder="Search" type="text" />
                            </div>
                        </div>
                        <button type="button" className="close" data-action="search-close" data-target="#navbar-search-main"
                            aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </form>

                    <ul className="navbar-nav align-items-center  ml-md-auto ">
                        <li className="nav-item d-xl-none">

                            <div className="pr-3 sidenav-toggler sidenav-toggler-dark" data-action="sidenav-pin"
                                data-target="#sidenav-main">
                                <div className="sidenav-toggler-inner">
                                    <i className="sidenav-toggler-line"></i>
                                    <i className="sidenav-toggler-line"></i>
                                    <i className="sidenav-toggler-line"></i>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item d-sm-none">
                            <a className="nav-link" href="#" data-action="search-show" data-target="#navbar-search-main">
                                <i className="ni ni-zoom-split-in"></i>
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <i className="ni ni-bell-55"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-xl  dropdown-menu-right  py-0 overflow-hidden">

                                <div className="px-3 py-3">
                                    <h6 className="text-sm text-muted m-0">You have <strong className="text-primary">13</strong> notifications.
                                    </h6>
                                </div>

                                <div className="list-group list-group-flush">
                                    <a href="#!" className="list-group-item list-group-item-action">
                                        <div className="row align-items-center">
                                            <div className="col-auto">

                                                <img alt="Image placeholder" src="assets/img/theme/team-1.jpg" className="avatar rounded-circle" />
                                            </div>
                                            <div className="col ml--2">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h4 className="mb-0 text-sm">John Snow</h4>
                                                    </div>
                                                    <div className="text-right text-muted">
                                                        <small>2 hrs ago</small>
                                                    </div>
                                                </div>
                                                <p className="text-sm mb-0">Let's meet at Starbucks at 11:30. Wdyt?</p>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#!" className="list-group-item list-group-item-action">
                                        <div className="row align-items-center">
                                            <div className="col-auto">

                                                <img alt="Image placeholder" src="assets/img/theme/team-2.jpg" className="avatar rounded-circle" />
                                            </div>
                                            <div className="col ml--2">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h4 className="mb-0 text-sm">John Snow</h4>
                                                    </div>
                                                    <div className="text-right text-muted">
                                                        <small>3 hrs ago</small>
                                                    </div>
                                                </div>
                                                <p className="text-sm mb-0">A new issue has been reported for Argon.</p>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#!" className="list-group-item list-group-item-action">
                                        <div className="row align-items-center">
                                            <div className="col-auto">

                                                <img alt="Image placeholder" src="assets/img/theme/team-3.jpg" className="avatar rounded-circle" />
                                            </div>
                                            <div className="col ml--2">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h4 className="mb-0 text-sm">John Snow</h4>
                                                    </div>
                                                    <div className="text-right text-muted">
                                                        <small>5 hrs ago</small>
                                                    </div>
                                                </div>
                                                <p className="text-sm mb-0">Your posts have been liked a lot.</p>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#!" className="list-group-item list-group-item-action">
                                        <div className="row align-items-center">
                                            <div className="col-auto">

                                                <img alt="Image placeholder" src="assets/img/theme/team-4.jpg" className="avatar rounded-circle" />
                                            </div>
                                            <div className="col ml--2">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h4 className="mb-0 text-sm">John Snow</h4>
                                                    </div>
                                                    <div className="text-right text-muted">
                                                        <small>2 hrs ago</small>
                                                    </div>
                                                </div>
                                                <p className="text-sm mb-0">Let's meet at Starbucks at 11:30. Wdyt?</p>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#!" className="list-group-item list-group-item-action">
                                        <div className="row align-items-center">
                                            <div className="col-auto">

                                                <img alt="Image placeholder" src="assets/img/theme/team-5.jpg" className="avatar rounded-circle" />
                                            </div>
                                            <div className="col ml--2">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h4 className="mb-0 text-sm">John Snow</h4>
                                                    </div>
                                                    <div className="text-right text-muted">
                                                        <small>3 hrs ago</small>
                                                    </div>
                                                </div>
                                                <p className="text-sm mb-0">A new issue has been reported for Argon.</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <a href="#!" className="dropdown-item text-center text-primary font-weight-bold py-3">View all</a>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <i className="ni ni-ungroup"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-dark bg-default  dropdown-menu-right ">
                                <div className="row shortcuts px-4">
                                    <a href="#!" className="col-4 shortcut-item">
                                        <span className="shortcut-media avatar rounded-circle bg-gradient-red">
                                            <i className="ni ni-calendar-grid-58"></i>
                                        </span>
                                        <small>Calendar</small>
                                    </a>
                                    <a href="#!" className="col-4 shortcut-item">
                                        <span className="shortcut-media avatar rounded-circle bg-gradient-orange">
                                            <i className="ni ni-email-83"></i>
                                        </span>
                                        <small>Email</small>
                                    </a>
                                    <a href="#!" className="col-4 shortcut-item">
                                        <span className="shortcut-media avatar rounded-circle bg-gradient-info">
                                            <i className="ni ni-credit-card"></i>
                                        </span>
                                        <small>Payments</small>
                                    </a>
                                    <a href="#!" className="col-4 shortcut-item">
                                        <span className="shortcut-media avatar rounded-circle bg-gradient-green">
                                            <i className="ni ni-books"></i>
                                        </span>
                                        <small>Reports</small>
                                    </a>
                                    <a href="#!" className="col-4 shortcut-item">
                                        <span className="shortcut-media avatar rounded-circle bg-gradient-purple">
                                            <i className="ni ni-pin-3"></i>
                                        </span>
                                        <small>Maps</small>
                                    </a>
                                    <a href="#!" className="col-4 shortcut-item">
                                        <span className="shortcut-media avatar rounded-circle bg-gradient-yellow">
                                            <i className="ni ni-basket"></i>
                                        </span>
                                        <small>Shop</small>
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ul className="navbar-nav align-items-center  ml-auto ml-md-0 ">
                        <li className="nav-item dropdown">
                            <a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <div className="media align-items-center">
                                    <span className="avatar avatar-sm rounded-circle">
                                        <img alt="Image placeholder" src="assets/img/theme/team-4.jpg" />
                                    </span>
                                    <div className="media-body  ml-2  d-none d-lg-block">
                                        <span className="mb-0 text-sm  font-weight-bold">John Snow</span>
                                    </div>
                                </div>
                            </a>
                            <div className="dropdown-menu  dropdown-menu-right ">
                                <div className="dropdown-header noti-title">
                                    <h6 className="text-overflow m-0">Welcome!</h6>
                                </div>
                                <a href="#!" className="dropdown-item">
                                    <i className="ni ni-single-02"></i>
                                    <span>My profile</span>
                                </a>
                                <a href="#!" className="dropdown-item">
                                    <i className="ni ni-settings-gear-65"></i>
                                    <span>Settings</span>
                                </a>
                                <a href="#!" className="dropdown-item">
                                    <i className="ni ni-calendar-grid-58"></i>
                                    <span>Activity</span>
                                </a>
                                <a href="#!" className="dropdown-item">
                                    <i className="ni ni-support-16"></i>
                                    <span>Support</span>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="#!" className="dropdown-item">
                                    <i className="ni ni-user-run"></i>
                                    <span>Logout</span>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div className="header bg-primary pb-6">
            <div className="container-fluid">
                <div className="header-body">
                    <div className="row align-items-center py-4">
                        <div className="col-lg-6 col-7">
                            <h6 className="h2 text-white d-inline-block mb-0">Default</h6>
                            <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
                                <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                    <li className="breadcrumb-item"><a href="#"><i className="fas fa-home"></i></a></li>
                                    <li className="breadcrumb-item"><a href="#">Dashboards</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Default</li>
                                </ol>
                            </nav>
                        </div>
                        <div className="col-lg-6 col-5 text-right">
                            <a href="#" className="btn btn-sm btn-neutral">New</a>
                            <a href="#" className="btn btn-sm btn-neutral">Filters</a>
                        </div>
                    </div>

                    {/* <div className="row">
                        <div className="col-xl-3 col-md-6">
                            <div className="card card-stats">

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <h5 className="card-title text-uppercase text-muted mb-0">Total traffic</h5>
                                            <span className="h2 font-weight-bold mb-0">350,897</span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                                                <i className="ni ni-active-40"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 mb-0 text-sm">
                                        <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                                        <span className="text-nowrap">Since last month</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card card-stats">

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <h5 className="card-title text-uppercase text-muted mb-0">New users</h5>
                                            <span className="h2 font-weight-bold mb-0">2,356</span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                                                <i className="ni ni-chart-pie-35"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 mb-0 text-sm">
                                        <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                                        <span className="text-nowrap">Since last month</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card card-stats">

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <h5 className="card-title text-uppercase text-muted mb-0">Sales</h5>
                                            <span className="h2 font-weight-bold mb-0">924</span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                                                <i className="ni ni-money-coins"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 mb-0 text-sm">
                                        <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                                        <span className="text-nowrap">Since last month</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card card-stats">

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <h5 className="card-title text-uppercase text-muted mb-0">Performance</h5>
                                            <span className="h2 font-weight-bold mb-0">49,65%</span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                                                <i className="ni ni-chart-bar-32"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 mb-0 text-sm">
                                        <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                                        <span className="text-nowrap">Since last month</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    </>
}