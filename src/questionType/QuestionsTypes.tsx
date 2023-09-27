import React from "react";
// import { ApplicationForm } from "../dataClass/ApplicationForm.tsx";
import "../questionType/QuestionsTypes.css";

interface QuestionType {
  selectValue: string;
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

  render() {
    switch (this.props.selectValue) {
      case "Paragraph":
        document
          .querySelector(".paragraph-container")
          ?.classList.remove("hidden");
        break;

      case "DropDown":
        document
          .querySelector(".dropdown-container")
          ?.classList.remove("hidden");
        break;
      case "Multiple Choice":
        document.querySelector(".mcq-container")?.classList.remove("hidden");
        break;

      case "Yes/No":
        document
          .querySelector(".yesorno-container")
          ?.classList.remove("hidden");
        break;

      default:
        break;
    }

    return (
      <>
        <div className="questionType-container">
          <div>
            <div className="paragraph-container hidden">
              {/* <input type="text" id="in-q" onChange={this.handleInputChange} /> */}
            </div>

            <div className="mcq-container hidden">
              <h4>Choice</h4>
              <input type="radio" name="" id="" />
            </div>

            <div className="dropdown-container hidden">dropdwon</div>

            <div className="yesorno-container hidden">yes or no</div>
          </div>

          <div className="btns-composite">
            <button className="btn-delete">
              <h2>X delete question</h2>
            </button>
            <button className="btn-save" onClick={this.onSave}>
              Save
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default QuestionsTypes;
