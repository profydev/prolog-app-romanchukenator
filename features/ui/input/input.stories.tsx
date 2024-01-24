import { FormEvent } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Input } from "./input";

export default {
  title: "UI/Input",
  component: Input,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
} as Meta<typeof Input>;

const inputStyles = {
  marginLeft: "auto",
  marginRight: "auto",
  display: "flex",
  marginTop: "50px",
};

let submitToPostman: boolean = false;

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  if (!submitToPostman) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const value = Object.fromEntries(data.entries());

    alert(`The form would have submitted this data: ${JSON.stringify(value)}`);
  }
};

const setSubmitToPostman = (val: boolean) => (submitToPostman = val);

const Template: StoryFn<typeof Input> = ({
  inputName,
  defaultValue,
  placeholderText,
  label,
  icon,
  helpText,
  errorText,
  error,
  disabled,
}) => (
  <div style={{ padding: 50, width: 400 }}>
    <form onSubmit={handleSubmit} name="Storybook form" method="post">
      <Input
        defaultValue={defaultValue}
        inputName={inputName}
        placeholderText={placeholderText}
        label={label}
        icon={icon}
        disabled={disabled}
        helpText={helpText}
        errorText={errorText}
        error={error}
      />

      <div className="submitWrapper" style={{ display: "flex" }}>
        <input
          type="submit"
          value="POST to Postman"
          formAction="https://postman-echo.com/post"
          onClick={() => setSubmitToPostman(true)}
          style={inputStyles}
        />

        <input
          type="submit"
          value="Check the submitted value"
          onClick={() => setSubmitToPostman(false)}
          style={inputStyles}
        />
      </div>
    </form>
  </div>
);

export const Default = Template.bind({});

Default.args = {
  inputName: "Input name",
  defaultValue: "",
  placeholderText: "Ye normal placeholder text",
  label: "Input label text",
  icon: "/icons/user.svg",
  disabled: false,
  error: false,
  errorText: "",
  helpText: "Normal help text",
};

Default.parameters = {
  viewMode: "docs",
};
