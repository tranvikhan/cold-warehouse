import React from "react";
import {
  Divider,
  Icon,
  Layout,
  List,
  ListItem,
  useTheme,
  MenuItem,
  OverflowMenu,
  TopNavigationAction,
  TopNavigation,
  Text,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigationState } from "@react-navigation/native";
import { deleteAllNotification } from "../../redux/actions";

export default function Notification({ navigation, state }) {
  const theme = useTheme();
  const [data, setData] = React.useState([]);
  const notifications = useSelector((state) => state.Notification.list);
  const auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const screenName = useNavigationState(
    (state) => state.routes[state.index].name
  );

  const mapType = {
    WARRING_LOW_TEMPERATURE: {
      name: "Cảnh báo nhiệt độ thấp",
      icon: "trending-down",
      color: "warning",
    },
    WARRING_HIGH_TEMPERATURE: {
      name: "Cảnh báo nhiệt độ cao",
      icon: "trending-up",
      color: "warning",
    },
    "Access-Invite": {
      name: "Lời mời kết bạn",
      icon: "mail",
      color: "success",
    },
    SUCCESS: {
      name: "Thành công",
      icon: "check-circle",
      color: "success",
    },
    ERRO: {
      name: "Lỗi",
      icon: "alert-triangle",
      color: "danger",
    },
  };

  React.useEffect(() => {
    if (notifications && screenName && screenName === "Notification") {
      setData(
        [...notifications].map((nt) => ({
          title: mapType[nt.type].name,
          description: nt.content,
          icon: mapType[nt.type].icon,
          color: mapType[nt.type].color,
        }))
      );
    }
  }, [notifications, screenName]);

  const renderMoreAction = (props) => <MoreAction {...props} />;
  const RenderItemIcon = (props) => <Icon {...props} name={props.name} />;

  const renderCheckIcon = (props) => (
    <Icon
      {...props}
      name="checkmark-outline"
      fill={theme["color-primary-default"]}
    />
  );

  const renderTopBar = () => (
    <TopNavigationAction
      icon={renderCheckIcon}
      onPress={() => {
        dispatch(deleteAllNotification(auth.user));
      }}
    />
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      title={() => (
        <Text category="s1" status={item.color}>
          {item.title}
        </Text>
      )}
      description={() => <Text category="p2">{item.description}</Text>}
      accessoryLeft={(props) => <RenderItemIcon {...props} name={item.icon} />}
      accessoryRight={renderMoreAction}
    />
  );

  return (
    <Layout style={{ flex: 1 }} level="2">
      <TopNavigation
        alignment="center"
        title="Thông báo"
        accessoryRight={renderTopBar}
      />
      <Divider />
      <List
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
      />
    </Layout>
  );
}

const MenuIcon = (props) => <Icon {...props} name="more-horizontal-outline" />;

const InfoIcon = (props) => <Icon {...props} name="info" />;

const TrashIcon = (props) => <Icon {...props} name="trash" />;

const MoreAction = (props) => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  return (
    <OverflowMenu
      anchor={renderMenuAction}
      visible={menuVisible}
      onBackdropPress={toggleMenu}
    >
      <MenuItem accessoryLeft={InfoIcon} title="Xem" />
      <MenuItem accessoryLeft={TrashIcon} title="Xóa" />
    </OverflowMenu>
  );
};
