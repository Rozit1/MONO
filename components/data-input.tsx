import dayjs from "dayjs";
import { useState } from "react";
import DateTimePickerModal, { DateTimePickerProps } from "react-native-modal-datetime-picker";
import { InputField, InputFieldProps } from "./inputfield";



export interface DateInputProps extends Omit<InputFieldProps, 'value' | 'onChange'>, Omit<DateTimePickerProps, 'onConfirm' | 'onChange' | 'onCancel'> {
    value?: Date;
    pattern?: string;
    onChange?: (date: Date) => void;
}

export function DateInputField({ value, onChange, pattern = 'YYYY-MM-DD', mode = "date", ...props }: DateInputProps) {
    const [date, setDate] = useState<Date | undefined>(value);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    return (
        <>
            <InputField
                {...props}
                editable={false}
                value={dayjs(date).format(pattern)}
                onPress={() => {
                    setDatePickerVisibility(true);
                }}
            />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                date={date}
                onChange={(date) => {
                    setDate(date);
                }}
                onConfirm={() => {
                    setDatePickerVisibility(false);
                    if (date) {
                        onChange?.(date);
                    }
                }}
                onCancel={() => {
                    setDatePickerVisibility(false);
                }}
            />
        </>
    )
}