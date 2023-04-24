const AppNavigationHeader = {
  headerStyle: {
    backgroundColor: "#f4511e",
  },
  headerTitleAlign: "center",
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const BottomNavigationStyles = {
  tabBarActiveTintColor: "blue",
  tabBarInactiveTintColor: "black", //'#66666666',
  tabBarActiveBackgroundColor: "red",

  tabBarStyle: {
    //   paddingVertical: 5,
    // borderTopLeftRadius: 0,
    // borderTopRightRadius: 0,
    // borderRadius: 20,
    backgroundColor: "yellow",
    position: "relative",
    height: 50,
  },
  tabBarLabelStyle: { paddingBottom: 5, fontSize: 12 },
  tabBarIconStyles: { color: "white", size: 25 },
};

const globalStylings = {
  bgColor: "#F2F5F5",
  hColor: "#37B9F1",
  hTextColor: "white",
  topNav: { ...AppNavigationHeader },
  bottomNav: { ...BottomNavigationStyles },
  cardsColor: "tomato",
  cardsTextColor: "#565360",
  font_Family: "sans-serif-thin",
};

export default globalStylings;
