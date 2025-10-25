"use client";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useState } from "react";

export default function DataTableFilters({ onSortChange, onDateFilter }) {
  const [sort, setSort] = useState("desc");
  const [dateRange, setDateRange] = useState([null, null]);

  const handleSort = (e) => {
    const value = e.target.value;
    setSort(value);
    onSortChange(value);
  };

  const handleDateChange = (range) => {
    setDateRange(range);
    if (range && range[0] && range[1]) {
      const start = range[0].toDate();
      const end = range[1].toDate();

      // 🕓 تنظیم بازه کامل روز
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      onDateFilter(start, end);
    } else {
      onDateFilter(null, null);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 p-3 bg-gray-800/40 rounded-md text-sm text-gray-200">
      {/* فیلتر مرتب‌سازی */}
      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-gray-300 whitespace-nowrap">
          مرتب‌سازی:
        </label>
        <select
          id="sort"
          value={sort}
          onChange={handleSort}
          className="bg-gray-700/60 rounded-md px-2 py-1 cursor-pointer focus:outline-none text-gray-100"
        >
          <option value="desc">جدیدترین</option>
          <option value="asc">قدیمی‌ترین</option>
        </select>
      </div>

      {/* انتخاب بازه تاریخ */}
      <div className="flex items-center gap-2">
        <label className="text-gray-300 whitespace-nowrap">بازه تاریخ:</label>
        <DatePicker
          range
          value={dateRange}
          onChange={handleDateChange}
          calendar={persian}
          locale={persian_fa}
          format="YYYY/MM/DD"
          inputClass="bg-gray-700/60 rounded-md px-2 py-1 text-gray-100 focus:outline-none"
          containerClassName="text-gray-100"
          placeholder="از تاریخ تا تاریخ"
        />
      </div>
    </div>
  );
}
