import { TextInput, TextInputProps } from "react-native";
import colors from "tailwindcss/colors";

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput
    multiline
    textAlignVertical="top"
    placeholderTextColor={colors.slate[400]}
        className="bg-slate-800 rounded-md text-white px-4 py-3 h-32 text-sm "
      {...rest}
    />
  );
}
