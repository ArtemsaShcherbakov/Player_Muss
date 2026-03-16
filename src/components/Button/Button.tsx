import { TouchableOpacity } from "react-native";

import { IButtonProps } from "./Button.types";

import { styles } from "./Button.styles";

const Button = ({ icon, styleButton, onPress }: IButtonProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, styleButton]}>
    {icon}
  </TouchableOpacity>
);

export { Button };
