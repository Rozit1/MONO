import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PageBackground from "@/assets/svg/profilebg.svg";
import { BackButton } from "@/components/back-button";
import ProgressModel from "@/components/progressmodel";
import { auth } from "@/services/firebase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import Toast from "react-native-toast-message";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    height: "25%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
  },
  profileContainer: {
    marginTop: "20%",
    alignItems: "center",
    gap: 12,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "semibold",
    color: '#222222'
  },
  profileEmail: {
    fontSize: 14,
    color: '#438883',
    fontWeight: "semibold",
  },
  profileMenus: {
    marginTop: 20,
    gap: 12,
  },
  profileMenuItem: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileMenuItemTitle: {
    fontSize: 16,
    color: '#000000',
    fontWeight: "medium",
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  }
});


export default function Profile() {
  return (
    <View style={styles.container}>
      <PageBackground style={styles.background} />
      <StatusBar style="light" />
      <SafeAreaView style={styles.content}>
        <BackButton />

        <ProfileHeader />

        <ProfileMenus />

      </SafeAreaView>
    </View>
  );
}

function ProfileHeader() {
  return (
    <View style={styles.profileContainer}>
      <Image
        source={require("@/assets/images/profile.png")}
        style={styles.profileImage}
        contentFit="contain"
      />
      <Text style={styles.profileName}>{auth.currentUser?.displayName ?? 'N/A'}</Text>
      <Text style={styles.profileEmail}>{auth.currentUser?.email ?? 'N/A'}</Text>
    </View>
  );
}

function ProfileMenus() {
  const router = useRouter();
  const [logoutProgress, setLogoutProgress] = useState(false);

  const handleLogout = async () => {
    try {
      setLogoutProgress(true);
      await auth.signOut();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to logout",
      });
    } finally {
      router.push("/login");
      setLogoutProgress(false);
    }
  }

  const menus: { title: string, icon: React.ComponentProps<typeof Ionicons>['name'], onPress: () => void }[] = [
    {
      title: "Invite Friends",
      icon: "people-outline",
      onPress: () => {
        console.log("Invite Friends");
      },
    },
    {
      title: "Account Info",
      icon: "information-circle-outline",
      onPress: () => {
        console.log("Account Info");
      }
    },
    {
      title: 'Data Security',
      icon: 'shield-outline',
      onPress: () => {
        console.log("Data Security");
      }
    },
    {
      title: 'Logout',
      icon: 'log-out-outline',
      onPress: () => {
        handleLogout();
      }
    }
  ];
  return (
    <View style={styles.profileMenus}>
      {
        menus.map((item, index) => (
          <View key={item.title}>
            <ProfileMenu title={item.title} icon={item.icon} onPress={item.onPress} />
            {index < menus.length - 1 && <View style={styles.divider} />}
            </View>
        ))
      }
      <ProgressModel visible={logoutProgress} />
    </View>
  );
}

function ProfileMenu({ title, icon, onPress }: { title: string, icon: React.ComponentProps<typeof Ionicons>['name'], onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.profileMenuItem} onPress={onPress}>
      <Ionicons name={icon} size={24} color="#666666" />
      <Text style={styles.profileMenuItemTitle}>{title}</Text>
    </TouchableOpacity>
  );
}