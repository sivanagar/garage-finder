


 function getAddressComponents(address_components, type) {
  const result = address_components.find((component) => {
    return component.types.includes(type);
  });

  return result ? result.long_name : null;
}

export default getAddressComponents;
