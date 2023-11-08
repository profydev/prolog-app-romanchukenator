import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Button, Size, Color } from "./button";

export default {
  title: "UI/Button",
  component: Button,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = ({
  size,
  color,
  disabled,
  label,
  iconLeft,
  iconRight,
  noStyles,
}) => (
  <div>
    <Button
      onClick={() => alert("Clicked!")}
      size={size}
      color={color}
      disabled={disabled}
      label={label}
      iconLeft={iconLeft}
      iconRight={iconRight}
      noStyles={noStyles}
    >
      Button UI
    </Button>
  </div>
);

export const Default = Template.bind({});

Default.args = {
  size: Size.medium,
  color: Color.primary,
  disabled: false,
  label: "Label text - ",
  iconLeft: {
    src: "/icons/circle.svg",
    width: 20,
    height: 20,
    alt: "Left icon",
  },
  iconRight: {
    src: "",
    width: 0,
    height: 0,
    alt: "",
  },
  noStyles: false,
};

Default.parameters = {
  viewMode: "docs",
};
