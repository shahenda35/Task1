import React from "react";
import "../uploadimage/UploadImg.css";

interface State {
  selectedImage: File | null;
}

class UploadImg extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      selectedImage: null,
    };
  }

  handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0] || null;
    this.setState({ selectedImage });
  };

  render() {
    return (
      <div className="img-container">
        <h3>Upload Cover Image</h3>

        <div className="uploaded-file">
          <div>
            <input
              className="img-input"
              type="file"
              accept="image/*"
              onChange={this.handleImageSelect}
            />
            {this.state.selectedImage && (
              <img
                src={URL.createObjectURL(this.state.selectedImage)}
                alt="Selected"
                className="preview-image"
              />
            )}
          </div>

          <div>
            <p>16:9 ratio is recommended. Max image size 1mb</p>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadImg;
