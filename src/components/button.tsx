import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

type ButtonsProps = TouchableOpacityProps & {
  children: React.ReactNode;
};

type ButtonTextProps = {
  children: React.ReactNode;
};

type ButtonIconProps = {
  children: React.ReactNode;
};

function Button({ children, ...rest }: ButtonsProps) {
  return (
    <TouchableOpacity
      className="h-12 bg-lime-400 rounded-md items-center justify-center flex-row"
      activeOpacity={0.7}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}

function ButtonText({ children }: ButtonTextProps) {
  return (
    <Text className="text-black font-heading text-base mx-2">{children}</Text>
  );
}

function ButtonIconProps({ children }: ButtonIconProps) {
  return children;
}


Button.Text = ButtonText;
Button.Icon = ButtonIconProps;

export { Button }