import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';

export interface DropdownInputProps<T> extends Partial<DropdownProps<T>> {
    label: string;
    placeholder?: string;
    error?: string;
}

export function DropdownInput<T extends { label: string, value: string } = { label: string, value: string }>({
    data = [],
    value,
    label,
    placeholder,
    value: initialValue,
    onChange,
    renderRightIcon,
    labelField,
    valueField,
    searchPlaceholder,
    error,
    ...rest
}: DropdownInputProps<T>) {
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={styles.label}>{label}</Text>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            {renderLabel()}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                value={value}
                maxHeight={300}
                labelField={labelField ?? "label"}
                valueField={valueField ?? "value"}
                placeholder={!isFocus ? (placeholder ?? "Select...") : '...'}
                searchPlaceholder={searchPlaceholder ?? "Search..."}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setIsFocus(false);
                    onChange?.(item);
                }}
                renderRightIcon={renderRightIcon ?? (() => <Ionicons name="chevron-down" size={24} color="#2F7E79" />)}
                {...rest}
            />
             {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    dropdown: {
        height: 45,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        borderColor: '#C8EDEA',
        backgroundColor: '#F0FAF9',
    },
    icon: {
        marginRight: 5,
    },
    label: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#5A8C88',
        marginBottom: 4,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    error: {
        color: 'red',
        fontSize: 12,
    },
});