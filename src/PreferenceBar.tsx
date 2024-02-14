import { useRef } from "react";
import { IoClose, IoSettings } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setColumnCount, setShowPreferenceBar } from "./store/preferenceSlice";

const PreferenceBar = () => {
  const { columnCount, showPreferenceBar } = useAppSelector(
    (state) => state.preference
  );
  const dispatch = useAppDispatch();
  const columnCountInput = useRef<HTMLInputElement | null>(null);

  const handleColumnCountChange = () => {
    const newColumnCount = columnCountInput?.current?.value;
    if (newColumnCount !== undefined)
      dispatch(setColumnCount(parseInt(newColumnCount)));
  };

  const handleShowPreferenceChange = () => {
    dispatch(setShowPreferenceBar(!showPreferenceBar));
  };

  return (
    <>
      <div>
        <button onClick={handleShowPreferenceChange}>
          {!showPreferenceBar ? <IoSettings /> : <IoClose />}
        </button>
      </div>
      <div className={`flex flex-col ${!showPreferenceBar && "hidden"}`}>
        <h2>Preferences</h2>
        <label className="flex flex-row">
          Columns
          <input
            ref={columnCountInput}
            type="number"
            min={1}
            max={5}
            value={columnCount}
            onChange={handleColumnCountChange}
          />
        </label>
      </div>
    </>
  );
};

export default PreferenceBar;
