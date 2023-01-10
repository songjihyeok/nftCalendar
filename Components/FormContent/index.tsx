// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { CSSProperties } from 'react';
import { Row, Col, Form, FormItemProps, Select, SelectProps, Input, InputProps, InputNumber, InputNumberProps, Button, Checkbox, Radio, Switch, DatePicker, DatePickerProps } from 'antd';
import { PasswordProps, TextAreaProps, SearchProps } from 'antd/lib/input';
import { RangePickerProps } from 'antd/lib/date-picker';
import Text from 'antd/lib/typography/Text';
import TextArea from 'antd/lib/input/TextArea';
import Search from 'antd/lib/input/Search';
import styled from 'styled-components';

// import global modules : 서비스 전역에서 사용중인 모듈을 선언하세요.
import { service, types } from '@src/configs';

// import local modules : 지역(route)에서 사용중인 모듈을 선언하세요.

export interface FormContentProps {
	gutter?: [number, number];
	parentKey?: string[];
	formItems: (types.FormItemUnionType | types.ComplexItemType)[];
	initialValues?: any;
	addOn?: (item: any) => JSX.Element | JSX.Element[] | null;
}

export default function FormContent({ gutter, parentKey, formItems, initialValues, addOn }: FormContentProps) {
	return (
		<Row gutter={gutter}>
			{formItems.map((item, i) => {
				const key = service.getValue(item, 'key', '');
				const type = service.getValue(item, 'type', '');

				const name = parentKey ? [...parentKey, key] : key;

				if (type === 'select') {
					const formItemProps: FormItemProps = {
						label: service.getValue(item, 'label', ''),
						required: service.getValue(item, 'required', false),
						name,
						rules: service.getValue(item, 'rules', []),
						initialValue: service.getValue(initialValues, key, service.getValue(item, 'defaultValue', null)),
					};

					const selectProps: SelectProps = {
						placeholder: service.getValue(item, 'placeholder', ''),
					};

					return (
						<Col key={i} span={service.getValue(item, 'span', 24)}>
							<Form.Item {...formItemProps}>
								<Select {...selectProps}>
									{service.getValue(item, 'options', []).map(({ label, value }: any, j: number) => {
										return (
											<Select.Option key={j} value={value}>
												{label}
											</Select.Option>
										);
									})}
								</Select>
							</Form.Item>
						</Col>
					);
				}

				if (type === 'number') {
					const formItemProps: FormItemProps = {
						label: service.getValue(item, 'label', ''),
						required: service.getValue(item, 'required', false),
						name,
						rules: service.getValue(item, 'rules', []),
						initialValue: service.getValue(initialValues, key, service.getValue(item, 'defaultValue', null)),
					};

					const inputNumberProps: InputNumberProps = {
						placeholder: service.getValue(item, 'placeholder', ''),
						min: service.getValue(item, 'min'),
						max: service.getValue(item, 'max'),
						minLength: service.getValue(item, 'minLength'),
						maxLength: service.getValue(item, 'maxLength'),
						onKeyDown: service.onKeyDownInputNumber,
					};

					return (
						<Col key={i} span={service.getValue(item, 'span', 24)}>
							<Form.Item {...formItemProps}>
								<StyledInputNumber {...inputNumberProps} />
							</Form.Item>
						</Col>
					);
				}

				if (type === 'password') {
					const formItemProps: FormItemProps = {
						label: service.getValue(item, 'label', ''),
						required: service.getValue(item, 'required', false),
						name,
						rules: service.getValue(item, 'rules', []),
						initialValue: service.getValue(initialValues, key, service.getValue(item, 'defaultValue', null)),
					};

					const inputProps: PasswordProps = {
						placeholder: service.getValue(item, 'placeholder', ''),
						minLength: service.getValue(item, 'minLength'),
						maxLength: service.getValue(item, 'maxLength'),
					};

					return (
						<Col key={i} span={service.getValue(item, 'span', 24)}>
							<Form.Item {...formItemProps}>
								<Input.Password {...inputProps} />
							</Form.Item>
						</Col>
					);
				}

				if (type === 'text') {
					const formItemProps: FormItemProps = {
						label: service.getValue(item, 'label', ''),
						required: service.getValue(item, 'required', false),
						name,
						rules: service.getValue(item, 'rules', []),
						initialValue: service.getValue(initialValues, key, service.getValue(item, 'defaultValue', null)),
					};

					const inputProps: InputProps = {
						placeholder: service.getValue(item, 'placeholder', ''),
						minLength: service.getValue(item, 'minLength'),
						maxLength: service.getValue(item, 'maxLength'),
						suffix: service.getValue(item, 'suffix'),
					};

					return (
						<Col key={i} span={service.getValue(item, 'span', 24)}>
							<Form.Item {...formItemProps}>
								<Input {...inputProps} onKeyDown={service.getValue(item, 'numberOnly', false) ? service.onKeyDownInputNumber : undefined} />
							</Form.Item>
						</Col>
					);
				}

				if (type === 'textarea') {
					const formItemProps = {
						label: service.getValue(item, 'label', ''),
						required: service.getValue(item, 'required', false),
						name,
						rules: service.getValue(item, 'rules', []),
						initialValue: service.getValue(initialValues, key, service.getValue(item, 'defaultValue', null)),
					};

					const textareaProps: TextAreaProps = {
						placeholder: service.getValue(item, 'placeholder', ''),
						minLength: service.getValue(item, 'minLength'),
						maxLength: service.getValue(item, 'maxLength'),
					};

					return (
						<Col key={i} span={service.getValue(item, 'span', 24)}>
							<Form.Item {...formItemProps}>
								<StyledTextArea height={service.getValue(item, 'height', null)} {...textareaProps} />
							</Form.Item>
						</Col>
					);
				}

				if (type === 'search') {
					const formItemProps = {
						label: service.getValue(item, 'label', ''),
						required: service.getValue(item, 'required', false),
						name,
						rules: service.getValue(item, 'rules', []),
						initialValue: service.getValue(initialValues, key, service.getValue(item, 'defaultValue', null)),
					};

					const searchProps: SearchProps = {
						enterButton: service.getValue(item, 'searchButtonProps') ? (
							<Button type={service.getValue(item, 'searchButtonProps.primary', true) ? 'primary' : 'default'}>{service.getValue(item, 'searchButtonProps.label', '')}</Button>
						) : undefined,
						placeholder: service.getValue(item, 'placeholder', ''),
						minLength: service.getValue(item, 'minLength'),
						maxLength: service.getValue(item, 'maxLength'),
						suffix: service.getValue(item, 'suffix'),
					};

					return (
						<Col key={i} span={service.getValue(item, 'span', 24)}>
							<Form.Item {...formItemProps}>
								<StyledSearch {...searchProps} />
							</Form.Item>
						</Col>
					);
				}

				if (type === 'checkbox') {
					const formItemProps = {
						label: service.getValue(item, 'label', ''),
						required: service.getValue(item, 'required', false),
						name,
						rules: service.getValue(item, 'rules', []),
						initialValue: service.getValue(initialValues, key, service.getValue(item, 'defaultValue', null)),
					};

					return (
						<Col key={i} span={service.getValue(item, 'span', 24)}>
							<Form.Item {...formItemProps}>
								<Checkbox.Group>
									{service.getValue(item, 'items', []).map(({ label, value }: any, j: number) => {
										return (
											<Checkbox key={j} value={value}>
												{label}
											</Checkbox>
										);
									})}
								</Checkbox.Group>
							</Form.Item>
						</Col>
					);
				}

				if (type === 'radio') {
					const formItemProps = {
						label: service.getValue(item, 'label', ''),
						required: service.getValue(item, 'required', false),
						name,
						rules: service.getValue(item, 'rules', []),
						initialValue: service.getValue(initialValues, key, service.getValue(item, 'defaultValue', null)),
					};

					return (
						<Col key={i} span={service.getValue(item, 'span', 24)}>
							<Form.Item {...formItemProps}>
								<Radio.Group>
									{service.getValue(item, 'items', []).map(({ label, value }: any, j: number) => {
										return (
											<Radio key={j} value={value}>
												{label}
											</Radio>
										);
									})}
								</Radio.Group>
							</Form.Item>
						</Col>
					);
				}

				if (type === 'switch') {
					const formItemProps: FormItemProps = {
						label: service.getValue(item, 'label', ''),
						required: service.getValue(item, 'required', false),
						name,
						rules: service.getValue(item, 'rules', []),
						valuePropName: 'checked',
						initialValue: service.getValue(initialValues, key, service.getValue(item, 'defaultValue', null)),
					};

					return (
						<Col key={i} span={service.getValue(item, 'span', 24)}>
							<Form.Item {...formItemProps}>
								<Switch />
							</Form.Item>
						</Col>
					);
				}

				if (type === 'label') {
					const formItemProps: FormItemProps = {
						label: service.getValue(item, 'label', ''),
						required: service.getValue(item, 'required', false),
						name,
						rules: service.getValue(item, 'rules', []),
						initialValue: service.getValue(initialValues, key, service.getValue(item, 'defaultValue', null)),
						valuePropName: 'children',
					};

					return (
						<Col key={i} span={service.getValue(item, 'span', 24)}>
							<Form.Item {...formItemProps}>
								<Text />
							</Form.Item>
						</Col>
					);
				}

				if (type === 'date') {
					const formItemProps: FormItemProps = {
						label: service.getValue(item, 'label', ''),
						required: service.getValue(item, 'required', false),
						name,
						rules: service.getValue(item, 'rules', []),
						initialValue: service.getValue(initialValues, key, service.getValue(item, 'defaultValue', null)),
					};

					const datePickerProps: DatePickerProps = {
						picker: service.getValue(item, 'picker') ?? 'date',
						placeholder: service.getValue(item, 'placeholder', ''),
						style: DatePickerInlineStyle,
					};

					return (
						<Col key={i} span={service.getValue(item, 'span', 24)}>
							<Form.Item {...formItemProps}>
								<DatePicker {...datePickerProps} />
							</Form.Item>
						</Col>
					);
				}

				if (type === 'daterange') {
					const defaultValue = service.getValue(item, 'defaultValue');
					const initialValue = service.getValue(initialValues, key);

					const formItemProps: FormItemProps = {
						label: service.getValue(item, 'label', ''),
						required: service.getValue(item, 'required', false),
						name,
						rules: service.getValue(item, 'rules', []),
						...(initialValue || defaultValue ? { initialValue: initialValue || defaultValue } : null),
					};

					const rangePickerProps: RangePickerProps = {
						picker: service.getValue(item, 'picker') ?? 'date',
						placeholder: service.getValue(item, 'placeholder', ''),
						style: DatePickerInlineStyle,
					};

					return (
						<Col key={i} span={service.getValue(item, 'span', 24)}>
							<Form.Item {...formItemProps}>
								<DatePicker.RangePicker {...rangePickerProps} />
							</Form.Item>
						</Col>
					);
				}

				if (type === 'complex') {
					const formItemProps: FormItemProps = {
						label: service.getValue(item, 'label', ''),
						required: service.getValue(item, 'required', false),
						name,
						rules: service.getValue(item, 'rules', []),
					};

					const formContentProps: FormContentProps = {
						gutter: service.getValue(item, 'gutter', null),
						parentKey: parentKey ? [...parentKey, key] : [key],
						formItems: service.getValue(item, 'children', []),
						initialValues: service.getValue(initialValues, key, {}),
					};

					return (
						<Col key={i} span={service.getValue(item, 'span', 24)}>
							<Form.Item {...formItemProps}>
								<FormContent {...formContentProps} />
							</Form.Item>
						</Col>
					);
				}

				if (addOn) {
					const formItem = addOn(item);
					return formItem ? (
						<Col key={i} span={service.getValue(item, 'span', 24)}>
							{formItem}
						</Col>
					) : null;
				}

				return null;
			})}
		</Row>
	);
}

const DatePickerInlineStyle: CSSProperties = {
	width: '100%',
};

// 함수로 작성한 styled component를 선언하세요.
const StyledInputNumber = styled(InputNumber)(({ theme }) => ({
	['&&']: {
		width: '100%',
	},
}));

const StyledTextArea = styled(TextArea)<{ height?: number }>(({ theme, ...props }) => {
	if (props['height']) {
		return {
			height: props['height'],
		};
	}

	return {};
});

const StyledSearch = styled(Search)(({ theme }) => ({
	['&& .ant-input']: {
		width: 'calc(100% - 15px)',
		borderRightWidth: 1,
		borderRightStyle: 'solid',
		borderTopRightRadius: 6,
		borderBottomRightRadius: 6,
	},
	['&&& .ant-input-group-addon .ant-btn']: {
		height: 52,
		borderTopLeftRadius: 6,
		borderBottomLeftRadius: 6,
	},
}));

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
	width: '100%',
}));

const StyledRangePicker = styled(DatePicker.RangePicker)(({ theme }) => ({
	width: '100%',
}));
