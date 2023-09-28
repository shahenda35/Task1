import React from "react";
// import { ApplicationForm } from "../dataClass/ApplicationForm.tsx";
import "../questionType/QuestionsTypes.css";

interface QuestionType {
  selectValue: string;
  question: string;
  onQuestionSave: (data: any) => void;
}

class QuestionsTypes extends React.Component<QuestionType> {
  constructor(props: QuestionType) {
    super(props);
    this.state = {
      selectValue: this.props.selectValue,
    };
  }

  onSave = () => {
    this.props.onQuestionSave(this.state);
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the inputValue state when the input value changes
    this.setState({ Question: event.target.value });
  };

  componentDidUpdate(prevProps: QuestionType) {
    if (prevProps.selectValue !== this.props.selectValue) {
      this.setState({ selectValue: this.props.selectValue });
    }
  }

  render() {
    const isVisibleParagraph = this.props.selectValue === "Paragraph";
    const isVisibleMCQ = this.props.selectValue === "Multiple Choice";
    const isVisibleDropdown = this.props.selectValue === "DropDown";
    const isVisibleYesNo = this.props.selectValue === "Yes/No";
    const { question } = this.props;
    return (
      <>
        <div className="questionType-container">
          <div>
            {/* paragrapgh container */}
            <div
              className={`paragraph-container ${
                isVisibleParagraph ? "" : "hidden"
              }`}
            >
              {/* <input type="text" id="in-q" onChange={this.handleInputChange} /> */}
            </div>

            {/* mcq contianer */}
            <div className={`mcq-container ${isVisibleMCQ ? "" : "hidden"}`}>
              <h3 className="title">Choice</h3>
              <div>
                <img src={require("../icons/unorderedList.png")} alt=""></img>
                <input
                  type="text"
                  className="mcq-text"
                  placeholder="  Type here"
                  id="in-q"
                  onChange={this.handleInputChange}
                />
                <span className="btn-addchoice">+</span>
              </div>
              <div className="choises">
                <input type="checkbox"></input>
                <span className="enable-options">Enable "Other" option</span>
                <h3>Max choice allowed</h3>
                <input
                  className="max-choice"
                  type="number"
                  placeholder="Enter number of choice allowed here"
                ></input>
              </div>
            </div>

            {/* dropdown container */}
            <div
              className={`dropdown-container ${
                isVisibleDropdown ? "" : "hidden"
              }`}
            >
              <h3 className="title">Choice</h3>
              <div>
                <img src={require("../icons/unorderedList.png")} alt=""></img>
                <input
                  type="text"
                  className="mcq-text"
                  placeholder="  Type here"
                />
                <span className="btn-addchoice">+</span>
              </div>
              <div className="choises">
                <input type="checkbox"></input>
                <span className="enable-options">Enable "Other" option</span>
              </div>
            </div>

            {/* yes no container */}
            <div
              className={`yesorno-container ${isVisibleYesNo ? "" : "hidden"}`}
            >
              <div className="yesno">
                <input type="checkbox"></input>
                <span className="disqualified">
                  Disqualify candidate if the answer is no
                </span>
              </div>
            </div>
          </div>

          {/* buttons */}
          <div className="btns-composite">
            <button className="btn-delete">
              <h2>X delete question</h2>
            </button>
            <button className="btn-save" onClick={this.onSave}>
              Save
            </button>
          </div>

          <p>Question: {question}</p>
        </div>
      </>
    );
  }
}

export default QuestionsTypes;
