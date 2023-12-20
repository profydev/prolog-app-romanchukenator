import { FormEvent } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Select } from "./select";

export default {
  title: "UI/Select",
  component: Select,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
} as Meta<typeof Select>;

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

const Template: StoryFn<typeof Select> = ({
  name,
  label,
  defaultOption,
  options,
  help,
  errorText,
  disabled,
}) => (
  <div style={{ padding: 50, width: 400 }}>
    <form onSubmit={handleSubmit} method="post">
      <Select
        name={name}
        label={label}
        defaultOption={defaultOption}
        options={options}
        help={help}
        errorText={errorText}
        disabled={disabled}
      />

      <div className="submitWrapper" style={{ display: "flex" }}>
        <input
          type="submit"
          value="POST to Postman"
          formAction="https://postman-echo.com/post"
          onClick={() => setSubmitToPostman(true)}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            marginTop: "50px",
          }}
        />

        <input
          type="submit"
          value="Check the submitted value"
          onClick={() => setSubmitToPostman(false)}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            marginTop: "50px",
          }}
        />
      </div>
    </form>
  </div>
);

export const Default = Template.bind({});

const options = [
  {
    value: "rickSanchez",
    label: "Rick Sanchez",
    icon: "/icons/logo-small.svg",
  },
  { value: "mortySmith", label: "Morty Smith", icon: "/icons/user.svg" },
  { value: "jerrySmith", label: "Jerry Smith", icon: "/icons/user.svg" },
  { value: "summerSmith", label: "Summer Smith", icon: "/icons/user.svg" },
  { value: "bethSmith", label: "Beth Smith" },
  { value: "jessica" },
  {
    value: "principalGeneVagina",
    label: "Principal Gene Vagina",
    icon: "/icons/user.svg",
  },
  { value: "8", label: "Birdperson", icon: "/icons/logo-small.svg" },
  {
    value: "9",
    label: "President Andre Curtis",
    icon: "/icons/logo-small.svg",
  },
  { value: "doctorPerson", label: "Dr. Helen Wong" },
  { value: "gilligan", label: "Gene Gilligan", icon: "icons/user.svg" },
  { value: "narutoSmith" },
];

Default.args = {
  name: "favoriteR&MCharacter",
  label: "Rick and Morty Characters",
  options: options,
  defaultOption: options[10],
  help: "Just choose, please",
  errorText: "",
  disabled: false,
};

Default.parameters = {
  viewMode: "docs",
};
