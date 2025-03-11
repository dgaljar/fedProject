import React from "react";

const AdminCategories = () => {
  return (
    <>
      <div className="container-fluid content mt-4">
        <h1 className="h2">Categories</h1>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="">Category</label>
              <input type="text" className="form-control" />
              <button className="btn btn-primary mt-3 mb-3">Add Category</button>
            </div>
            <div className="col-md-6">
              <div className="table-responsive small">
                <table className="table table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>ID</th>
                      <th>Category title</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Technology</td>
                      <td>
                        <a href="">Delete</a>
                      </td>
                      <td>
                        <a href="">Edit</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCategories;
