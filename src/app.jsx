import React from "react";
import "../src/style.css";

export default class TodoList extends React.Component {
  state = {
    value: "",
    time: "",
    list: [],
    index: "",
  };

  handleValue = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleItems = () => {
    if (this.state.value === "") {
      alert("Please Write Something");
    } else {
      let items = this.state.list;
      let t = this.state.time;
      let val = this.state.value;
      items.push({ val, t });
      this.setState({
        list: items,
        time: "",
        value: "",
        index: -1,
      });
    }
  };

  handleTime = (e) => {
    this.setState({
      time: e.target.value,
    });
  };

  handleShiftUp = (i) => {
    if (i === 0) {
      alert("Already on Top");
    } else {
      let arr = this.state.list;

      let temp = arr[i - 1];
      arr[i - 1] = arr[i];
      arr[i] = temp;

      this.setState({
        list: arr,
      });
    }
  };

  handleShiftDown = (i) => {
    if (i === this.state.list.length - 1) {
      alert("Already in Last");
    } else {
      let arr = this.state.list;

      let temp = arr[i + 1];
      arr[i + 1] = arr[i];
      arr[i] = temp;

      this.setState({
        list: arr,
      });
    }
  };

  handleDelete = (i) => {
    let data = this.state.list;
    data.splice(i, 1);
    this.setState({
      list: data,
    });
  };

  handleEdit = (i) => {
    let arr = this.state.list;

    this.setState({
      value: arr[i].val,
      time: arr[i].t,
      index: i,
    });
  };

  handleUpdate = () => {
    if (this.state.index === -1) {
      alert("Click on Edit Button First");
    } else {
      let arr = this.state.list;
      let i = this.state.index;
      let val = this.state.value;
      let t = this.state.time;

      arr.splice(i, 1, { val, t });

      this.setState({
        list: arr,
        value: "",
        time: "",
        index: -1,
      });
    }
  };

  handleCheck = () => {
    if (this.state.list.length > 0) {
      let date = new Date();
      let fullTime = date.toTimeString();
      //   console.log(fullTime,"fulltime");
      let currentTime = fullTime.slice(0, 5);
      //   console.log(currentTime,"current");
      let getList = this.state.list;

      getList.map((ele, i) => {
        if (ele.t === currentTime) {
          alert(ele.val + " !!! Your Time Has Come");
          getList.splice(i, 1);
          this.setState({
            list: getList,
            value: "",
            time: "",
          });
        }
      });
    }
  };

  componentDidMount() {
    this.nameInput.focus();
  }

  render() {
    console.log(this.state);

    setInterval(this.handleCheck, 1000);

    let data = this.state.list.map((ele, i) => {
      return (
        <tr key={i}>
          <th>{i + 1}</th>
          <td>{ele.val}</td>
          <td>{ele.t}</td>
          <td>

            <div className="container">

                <div className="row">

                  <div className="p-0 col-lg-6 col-md-6 col-sm-6 col-12 d-flex justify-content-lg-end justify-content-md-end justify-content-sm-end justify-content-center align-items-center">

                  <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => this.handleEdit(i)}
                  ref={this.nameInput.focus()}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    type="button"
                    onClick={() => this.handleDelete(i)}
                  >
                    Delete
                  </button>

                  </div>

                  <div className="p-0 col-lg-6 col-md-6 col-sm-6 col-12 mt-lg-0 mt-md-0 mt-sm-0 mt-3 d-flex justify-content-lg-start justify-content-md-start justify-content-sm-start justify-content-center align-items-center">

                  <button
                  className="btn btn-success ml-2"
                  type="button"
                  onClick={() => this.handleShiftUp(i)}
                  >
                    Up
                  </button>
                  <button
                    className="btn btn-secondary ml-2"
                    type="button"
                    onClick={() => this.handleShiftDown(i)}
                  >
                    Down
                  </button>

                  </div>

                </div>

            </div>

          </td>
        </tr>
      );
    });

    return (
      <div className="container-fluid mainDiv">
        <div className="row">
          <div className="col-12">
            <h1>TODO List</h1>
          </div>

          <div className="col-lg-8 col-md-12 col-sm-12 col-12 mt-5 d-flex justify-content-lg-end justify-content-center align-items-center">

          <input
              className="inpBox"
              type="text"
              value={this.state.value}
              onChange={this.handleValue}
              placeholder="Items"
              ref={(input) => {
                this.nameInput = input;
              }}
            />

            <input
              type="time"
              value={this.state.time}
              onChange={this.handleTime}
              className="timeBox"
            />

          </div>

          <div className="col-lg-2 col-md-12 col-sm-12 col-12 col-sm-12 mt-lg-0 mt-4 d-flex justify-content-lg-between justify-content-center  align-items-end">

          <button
              className="btn btn-primary updateBtn"
              type="button"
              onClick={this.handleItems}
            >
              Add
            </button>

            <button
              className="btn btn-primary updateBtn"
              type="button"
              onClick={this.handleUpdate}
            >
              Update
            </button>

          </div>

            <table className="table table-dark mt-5 w-100">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Time</th>
                  <th scope="col">Operations</th>
                </tr>
              </thead>
              <tbody>{data}</tbody>
            </table>
          </div>
        </div>
    );
  }
}
