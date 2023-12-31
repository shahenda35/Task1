import React from "react";
import { ApplicationForm } from "../dataClass/ApplicationForm.tsx";
import "../questions/Questions.css";
import QuestionsTypes from "../questionType/QuestionsTypes.tsx";

interface QuestionsState {
  data: ApplicationForm | null;
  isLoading: boolean;
  error: Error | null;
  open: boolean;
  selectValue: string;
  types: { name: string }[];
  savedQuestion: string;
  questionsList: string[];
}

class Questions extends React.Component<{}, QuestionsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      error: null,
      open: false,
      selectValue: "",
      types: [
        { name: "Paragraph" },
        { name: "Short Answer" },
        { name: "Yes/No" },
        { name: "DropDown" },
        { name: "Multiple Choice" },
        { name: "Date" },
        { name: "Number" },
        { name: "File Upload" },
        { name: "Video Question" },
      ],
      savedQuestion: "",
      questionsList: [],
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

  handleMouseOpen = () => {
    this.setState({ open: true });
  };

  handleMouseLeave = () => {
    this.setState({ open: false });
  };

  handleChange = (event: any) => {
    const selectedValue = event.target.textContent;
    const name = selectedValue;
    const btnDropdown = document.querySelector(".btn-Dropdown");
    if (btnDropdown) {
      this.setState({ selectValue: name, open: false }, () => {
        btnDropdown.textContent = `${name}`;
      });
    }
  };

  onQuestionSave = () => {
    const { savedQuestion, questionsList } = this.state;

    if (savedQuestion.trim() !== "") {
      this.setState({
        questionsList: [...questionsList, savedQuestion],
        savedQuestion: "",
      });
    }

    console.log(questionsList);
  };

  render() {
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
      <div className="question-container">
        <h3 className="q-title">Questions</h3>
        <>
          {/* question type */}
          <div className="question-type">
            <h4>Type</h4>
            <div className="dropdown-container">
              <button
                className="btn-Dropdown"
                onMouseEnter={this.handleMouseOpen}
                onMouseLeave={this.handleMouseLeave}
                placeholder=""
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  className="dropdown-icon"
                >
                  <path d="M12 21l-12-18h24z" fill="black" />
                </svg>
                {open ? (
                  <ul
                    className={`type-menu ${this.state.open ? "open" : ""}`}
                    onClick={this.handleChange}
                  >
                    {this.state.types.map((item: any, index: number) => (
                      <li className="btn-item" key={index}>
                        {item.name}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </button>
            </div>
          </div>

          {/* question */}
          <div className="question">
            <h4>Question</h4>
            <input
              type="text"
              className="question-text"
              placeholder="  Type here"
              value={this.state.savedQuestion}
              onChange={(event) =>
                this.setState({ savedQuestion: event.target.value })
              }
            ></input>
          </div>

          {/* choosen */}
          <div className="type-choosen">
            <QuestionsTypes
              selectValue={this.state.selectValue}
              onQuestionSave={this.onQuestionSave}
              question={this.state.savedQuestion}
            />
          </div>

          {/* List of saved questions */}
          <div className="questions-list">
            {/* <h4>Saved Questions</h4> */}
            {/* <div>
              {this.state.questionsList.map((question, index) => (
                <QuestionsTypes key={index}  selectValue={this.state.selectValue} />
              ))}
            </div> */}
          </div>
        </>
      </div>
    );
  }
}

export default Questions;
