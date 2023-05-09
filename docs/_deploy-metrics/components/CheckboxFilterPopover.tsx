import { useFilterState } from "../hooks/useFilterState";
import { CheckboxFilter } from "./CheckboxFilter";
import { FilterPopoverButton, FilterPopoverContent } from "./FilterPopover";
import * as UI from "@chakra-ui/react";

export interface FilterOption {
  label: string;
  value: string;
  count: number;
}

interface CheckboxFilterPopoverProps {
  label: string;
  onSubmit: ((value: never[]) => void) | undefined;
  options: FilterOption[];
}

export const CheckboxFilterPopover = ({
  label,
  onSubmit,
  options,
}: CheckboxFilterPopoverProps) => {
  const state = useFilterState({
    defaultValue: [],
    onSubmit,
  });
  return (
    <UI.Popover placement="bottom-end">
      <FilterPopoverButton label={label} />
      <FilterPopoverContent
        isCancelDisabled={!state.canCancel}
        onClickApply={state.onSubmit}
        onClickCancel={state.onReset}
      >
        <CheckboxFilter
          label={label}
          value={state.value}
          onChange={(v) => state.onChange(v as any)}
          options={options}
        />
      </FilterPopoverContent>
    </UI.Popover>
  );
};
