import { SetStateAction, useLayoutEffect, useRef } from 'react';

const MIN_TEXTAREA_HEIGHT = 0;
type Props = {
    value: string, 
    placeholder: string, 
    autofocus: boolean, 
    onkeyup: () => Promise<void>
    setValue: React.Dispatch<SetStateAction<string>>
}
const TextArea: React.FC<Props> = ({value, placeholder, autofocus, onkeyup, setValue}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useLayoutEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "inherit";
            textareaRef.current.style.height = `${Math.max(
              textareaRef.current.scrollHeight,
              MIN_TEXTAREA_HEIGHT
            )}px`;
        }
    }, [value]);
    return (
      <textarea onKeyUp={e => {if(e.key === 'Enter') onkeyup()}}
        className={`w-full h-full text-neutral-400 font-semibold bg-transparent`}
        autoFocus={autofocus}
        onChange={e => setValue(e.target.value)}
        ref={textareaRef}
        rows={1}
        placeholder={placeholder}
        style={{
          minHeight: MIN_TEXTAREA_HEIGHT,
          resize: "none"
        }}
        value={value}
      />
    );
}
 
export default TextArea;