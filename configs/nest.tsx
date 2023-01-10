export const nest = (...components: any[]) => {
  return (props: any) => {
    return components.reduceRight(
      (children, Current) => <Current {...props}>{children}</Current>,
      props.children
    );
  };
};
