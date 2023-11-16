import { FormEvent } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Checkbox, CheckboxSize } from "./checkbox";

export default {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
} as Meta<typeof Checkbox>;

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const data = new FormData(event.currentTarget);
  const submittedData: { [key: string]: FormDataEntryValue | null } = {};
  const keys = Array.from(data.keys());

  for (const key of keys) {
    submittedData[key] = data.get(key);
  }

  alert(
    `The form would have submitted this data: ${JSON.stringify(submittedData)}`,
  );
};

const Template: StoryFn<typeof Checkbox> = ({
  id,
  label,
  value,
  name,
  disabled,
  indeterminate,
  checked,
  size,
}) => (
  <form onSubmit={handleSubmit} method="post" action="https://test-url.com">
    <div style={{ padding: 50 }}>
      <Checkbox
        id={id}
        label={label}
        value={value}
        name={name}
        checked={checked}
        disabled={disabled}
        indeterminate={indeterminate}
        size={size}
      />
    </div>

    <input
      type="submit"
      name="submit"
      value="Submit"
      style={{ marginLeft: "auto", marginRight: "auto", display: "flex" }}
    />
  </form>
);

export const Default = Template.bind({});

Default.args = {
  id: "",
  name: "name",
  value: "Bob Belcher",
  label: "Checkbox label",
  checked: false,
  indeterminate: false,
  disabled: false,
  size: CheckboxSize.small,
};

Default.parameters = {
  viewMode: "docs",
};
