import { useState } from 'react';
import Layout from "../components/Layout/Layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faCoins, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import {useHttpGet} from "../api/use-http";
import {Dashboard} from "../models/dashboardModel";
import SpinnerSmall from "../components/UI/SpinnerSmall";
import Spinner from "../components/UI/Spinner";
import PopularProducts from '../components/Products/PopularProducts';

const Home = () => {
    const [dashboard, setDashboard] = useState<Dashboard | null>(null);

    const applyDashboard = (data: any) => {
        setDashboard(data);
    }

    const { loading, error } = useHttpGet('dashboard', applyDashboard);

    console.log(dashboard);

    return (
      <Layout>
          <section className="section-overview">
              <div className="row">
                  <div className="col-xl-3 col-md-6 mb-4">
                      <div className="card border-left-primary shadow h-100 py-2">
                          {!loading && <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                  <div className="col mr-2">
                                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Orders
                                      </div>
                                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                                          {dashboard?.orders_no}
                                      </div>
                                  </div>
                                  <div className="col-auto">
                                      <FontAwesomeIcon icon={faCoins} className="fas fa-users fa-2x text-gray-300"/>
                                  </div>
                              </div>
                          </div>}
                          {loading && <SpinnerSmall />}
                      </div>
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                      <div className="card border-left-warning shadow h-100 py-2">
                          {!loading && <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                  <div className="col mr-2">
                                      <div
                                          className="text-xs font-weight-bold text-warning text-uppercase mb-1">Sales
                                      </div>
                                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                                          ${dashboard?.total_revenue}
                                      </div>
                                  </div>
                                  <div className="col-auto">
                                      <FontAwesomeIcon icon={faDollarSign} className="fas fa-users fa-2x text-gray-300"/>
                                  </div>
                              </div>
                          </div>}
                          {loading && <SpinnerSmall />}
                      </div>
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                      <div className="card border-left-success shadow h-100 py-2">
                          {!loading && <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                  <div className="col mr-2">
                                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Something
                                      </div>
                                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                                          10
                                      </div>
                                  </div>
                                  <div className="col-auto">
                                      <FontAwesomeIcon icon={faUsers} className="fas fa-users fa-2x text-gray-300"/>
                                  </div>
                              </div>
                          </div>}
                          {loading && <SpinnerSmall />}
                      </div>
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                      <div className="card border-left-warning shadow h-100 py-2">
                          {!loading && <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                  <div className="col mr-2">
                                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Clients</div>
                                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                                          {dashboard?.total_clients}
                                      </div>
                                  </div>
                                  <div className="col-auto">
                                      <FontAwesomeIcon icon={faUsers} className="fas fa-users fa-2x text-gray-300"/>
                                  </div>
                              </div>
                          </div>}
                          {loading && <SpinnerSmall />}
                      </div>
                  </div>
              </div>

              <div className="row">

                  <div className="col-xl-8 col-lg-7">
                      <div className="card shadow mb-4">
                          <div className="card-header py-3">
                              <h6 className="m-0 font-weight-bold text-primary">Area Chart</h6>
                          </div>
                          <div className="card-body">
                              <div className="chart-area">
                                  <canvas id="myAreaChart" />
                              </div>
                          </div>
                      </div>

                      <div className="card shadow mb-4">
                          <div className="card-header py-3">
                              <h6 className="m-0 font-weight-bold text-primary">Bar Chart</h6>
                          </div>
                          <div className="card-body">
                              <div className="chart-bar">
                                  <canvas id="myBarChart" />
                              </div>
                          </div>
                      </div>

                  </div>

                  <div className="col-xl-4 col-lg-5">
                      <div className="card shadow mb-4">
                          <div className="card-header py-3">
                              <h6 className="m-0 font-weight-bold text-primary">Donut Chart</h6>
                          </div>

                          <div className="card-body">
                              <div className="chart-pie pt-4">
                                  <canvas id="myPieChart" />
                              </div>
                          </div>
                      </div>

                      <PopularProducts />
                  </div>
              </div>
          </section>
      </Layout>
    );
}

export default Home;