import Layout from "../components/Layout/Layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
    return (
      <Layout>
          <section className="section-overview">
              <div className="row">
                  <div className="col-xl-3 col-md-6 mb-4">
                      <div className="card border-left-primary shadow h-100 py-2">
                          <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                  <div className="col mr-2">
                                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Users
                                      </div>
                                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                                          5
                                      </div>
                                  </div>
                                  <div className="col-auto">
                                      <FontAwesomeIcon icon={faUsers} className="fas fa-users fa-2x text-gray-300"/>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                      <div className="card border-left-success shadow h-100 py-2">
                          <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                  <div className="col mr-2">
                                      <div
                                          className="text-xs font-weight-bold text-success text-uppercase mb-1">Campionate
                                      </div>
                                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                                          1
                                      </div>
                                  </div>
                                  <div className="col-auto">
                                      <FontAwesomeIcon icon={faUsers} className="fas fa-users fa-2x text-gray-300"/>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                      <div className="card border-left-success shadow h-100 py-2">
                          <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                  <div className="col mr-2">
                                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Meciuri
                                          campionate
                                      </div>
                                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                                          3
                                      </div>
                                  </div>
                                  <div className="col-auto">
                                      <FontAwesomeIcon icon={faUsers} className="fas fa-users fa-2x text-gray-300"/>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                      <div className="card border-left-warning shadow h-100 py-2">
                          <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                  <div className="col mr-2">
                                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Meciuri
                                          amicale
                                      </div>
                                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                                          1
                                      </div>
                                  </div>
                                  <div className="col-auto">
                                      <FontAwesomeIcon icon={faUsers} className="fas fa-users fa-2x text-gray-300"/>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </Layout>
    );
}

export default Home;