import React from "react";

const AdminCategories = () => {
  return (
    <>
      <div class="container-fluid content mt-4">
        <h1 class="h2">Categories</h1>
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <label for="">Category</label>
              <input type="text" class="form-control" />
              <button class="btn btn-primary mt-3 mb-3">Add Category</button>
            </div>
            <div class="col-md-6">
              <div class="table-responsive small">
                <table class="table table-bordered">
                  <thead class="thead-dark">
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
