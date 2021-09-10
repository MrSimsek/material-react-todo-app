import React from "react";
import Icon from "@material-ui/core/Icon";

type DynamicMuiFontIconProps = {
  iconName: string;
};

function DynamicMuiFontIcon({ iconName }: DynamicMuiFontIconProps) {
  return <Icon fontSize="small">{iconName}</Icon>;
}

export default DynamicMuiFontIcon;
