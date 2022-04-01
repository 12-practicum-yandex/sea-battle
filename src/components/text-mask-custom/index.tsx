import { forwardRef, RefCallback } from 'react';
import { IMaskInput } from 'react-imask';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const TextMaskCustom = forwardRef<HTMLElement, CustomProps>(function TextMaskCustom(
  props,
  ref,
) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="# (###) ### ## ##"
      definitions={{
        '#': /[0-9]/,
      }}
      inputRef={ref as RefCallback<HTMLTextAreaElement | HTMLInputElement>}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
      unmask
    />
  );
});
