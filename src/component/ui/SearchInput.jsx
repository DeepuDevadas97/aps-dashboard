
import { FiSearch } from "react-icons/fi";

export default function SearchInput({ value, onChange, placeholder, id = 'search' }) {
  return (
    <label className="search-box" htmlFor={id}>
      <span aria-hidden="true">
        < FiSearch  size={20} className="font-normal"/>
      </span>
      <input id={id} value={value} onChange={onChange} placeholder={placeholder} />
    </label>
  );
}
