interface iPropertyFields {
  description: string
}

interface iProperty {
  id: string
  title: string
  propertyFields: iPropertyFields
}

const PropertyScreen = ({ property }: { property: iProperty }): JSX.Element => {
  return (
    <div>
      <h1>Property detail</h1>
      <p>{property?.title}</p>
      <p>{property?.propertyFields?.description}</p>
    </div>
  )
}

export default PropertyScreen
