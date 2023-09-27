import React from "react";
import { ApplicationForm } from "../dataClass/ApplicationForm.tsx";
import "../profile/Profile.css";
import Questions from "../questions/Questions.tsx";

interface QuestionsState {
  data: ApplicationForm | null;
  isLoading: boolean;
  error: Error | null;
  open: boolean;
  selectValue: string;
  types: { name: string }[];
  isToggle1: boolean;
  isToggle2: boolean;
  isToggle3: boolean;
}

class Profile extends React.Component<{}, QuestionsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      error: null,
      open: false,
      selectValue: "",
      isToggle1: false,
      isToggle2: false,
      isToggle3: false,
      types: [
        { name: "Short Answer" },
        { name: "Paragraph" },
        { name: "Yes/No" },
        { name: "DropDown" },
        { name: "Multiple Choice" },
        { name: "Date" },
        { name: "Number" },
        { name: "File Upload" },
        { name: "Video Question" },
      ],
    };
  }

  componentDidMount() {
    const x = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:4010/api/887.7935644644983/programs/enim/application-form"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        this.setState({
          data: new ApplicationForm(json["data"]),
          isLoading: false,
        });
        console.log(json);
        console.log(response);
        console.log(new ApplicationForm(json["data"]));
      } catch (error: any) {
        console.log("Error:", error);
        this.setState({
          error,
          isLoading: false,
        });
      }
    };

    x();
  }

  handleToggleClick = (key: keyof QuestionsState) => {
    this.setState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleChange = (event: any) => {
    const selectedValue = event.target.textContent;
    const name = selectedValue.split(" ")[0];
    const btnDropdown = document.querySelector(".btn-Dropdown");
    if (btnDropdown) {
      this.setState({ selectValue: name, open: false }, () => {
        btnDropdown.textContent = `${name}`;
      });
    }
  };

  render() {
    console.log("rendering...");

    const { data, isLoading, error, open } = this.state;
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (!data) {
      return <div>loading....</div>;
    }
    return (
      <div className="profile-main-container">
        <div className="profile-container">
          <h3>Profile</h3>
          <>
            <div className="education-container">
              <h4>Education</h4>
              <div className="education-labels">
                <label>
                  <input type="checkbox" className="btn-checkbox"></input>
                  <span className="label-text">Mandatory</span>
                </label>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={this.state.isToggle1}
                    onChange={() => this.handleToggleClick("isToggle1")}
                  ></input>
                  <span className="slider round"></span>
                </label>
                <span className="label-text">
                  {" "}
                  {this.state.isToggle1 ? "Show" : "Hide"}
                </span>
              </div>
            </div>

            <div className="experience-container">
              <h4>Experience</h4>
              <div className="experience-labels">
                <label>
                  <input type="checkbox" className="btn-checkbox"></input>
                  <span className="label-text">Mandatory</span>
                </label>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={this.state.isToggle2}
                    onChange={() => this.handleToggleClick("isToggle2")}
                  ></input>
                  <span className="slider round"></span>
                </label>
                <span className="label-text">
                  {this.state.isToggle2 ? "Show" : "Hide"}
                </span>
              </div>
            </div>

            <div className="resume-container">
              <h4>Resume</h4>
              <div className="resume-labels">
                <label>
                  <input type="checkbox" className="btn-checkbox"></input>
                  <span className="label-text">Mandatory</span>
                </label>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={this.state.isToggle3}
                    onChange={() => this.handleToggleClick("isToggle3")}
                  />
                  <span className="slider round"></span>
                </label>
                <span className="label-text">
                  {this.state.isToggle3 ? "Show" : "Hide"}
                </span>
              </div>
            </div>

            <button className="btn-addQuestion" onClick={this.handleOpen}>
              <h2>+ Add a question</h2>
            </button>
          </>
        </div>
        <div>{open ? <Questions /> : null}</div>
      </div>
    );
  }
  //   }
}

export default Profile;
