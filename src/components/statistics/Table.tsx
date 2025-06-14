import { ConfigProvider, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import type { TableFields } from "../../components/common/Types"
import { unique } from "radash"
import { starsToIcon, valuation } from "../../components/common/Helpers"

export default function DrawTable({
  dataSource,
}: {
  dataSource: TableFields[]
}) {
  const countryFilter = unique(dataSource.map((r) => r.country)).map((r) => ({
    text: r,
    value: r,
  }))
  const starFilter = unique(dataSource.map((r) => r.stars)).map((r) => ({
    text: (
      <img src={starsToIcon(r)} alt="Michelin stars" className="h-4 inline" />
    ),
    value: r,
  }))
  const yearFilter = unique(dataSource.map((r) => r.year)).map((r) => ({
    text: r,
    value: r,
  }))

  const columns: ColumnsType<TableFields> = [
    {
      title: "Restaurant",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Stars",
      dataIndex: "stars",
      defaultSortOrder: "descend",
      filters: starFilter,
      onFilter: (value: any, record) => record.stars === value,
      sorter: (a, b) => a.stars - b.stars,
      render: (_value, record) => (
        <img
          src={starsToIcon(record.stars)}
          alt="Michelin stars"
          className="h-5"
        />
      ),
    },
    {
      title: "Food",
      dataIndex: "food",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.food - b.food,
      render: (_value, record) => <>{valuation(record.food)}</>,
      responsive: ["md"],
    },
    {
      title: "Wine pairing",
      dataIndex: "winePairing",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.winePairing - b.winePairing,
      render: (_value, record) => <>{valuation(record.winePairing)}</>,
      responsive: ["md"],
    },
    {
      title: "Google Rating",
      dataIndex: "googleRating",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.googleRating - b.googleRating,
      responsive: ["md"],
    },
    {
      title: "Country",
      dataIndex: "country",
      filters: countryFilter,
      onFilter: (value: any, record) => record.country.indexOf(value) === 0,
      sorter: (a, b) => a.country.length - b.country.length,
      responsive: ["md"],
    },
    {
      title: "Year",
      dataIndex: "year",
      filters: yearFilter,
      onFilter: (value: any, record) => record.year.indexOf(value) === 0,
      sorter: (a, b) => a.year.length - b.year.length,
    },
  ]

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#651fff",
          controlItemBgActive: "#651fff",
          colorBgContainer: "#f5f5f5",
          fontFamily: "Montserrat, sans-serif",
          fontSize: 18,
        },
      }}
    >
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ position: ["bottomCenter"] }}
      />
    </ConfigProvider>
  )
}
