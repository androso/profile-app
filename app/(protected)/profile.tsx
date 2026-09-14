import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Drawer from "expo-router/drawer";
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDrawer } from "../src/admin/viewmodels/use-drawer";

export default function ProfileScreen() {
	const router = useRouter();
	const { profile } = useDrawer();

	const goBack = () => {
		if (router.canGoBack()) {
			router.back();
			return;
		}

		router.replace("/dashboard");
	};

	return (
		<SafeAreaView style={styles.container}>
			<Drawer.Screen options={{ headerShown: false }} />
			<View style={styles.header}>
				<TouchableOpacity onPress={goBack}>
					<Ionicons name="arrow-back-outline" size={26} />
				</TouchableOpacity>
				<Text style={styles.logoText}>Shop Easy</Text>
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				<View style={styles.profileCard}>
					<View style={styles.imageWrapper}>
						<Image
							source={{ uri: profile.avatarUrl }}
							style={styles.profileAvatar}
						/>
						<TouchableOpacity style={styles.cameraBtn}>
							<Ionicons name="camera" size={16} color="#FFFFFF" />
						</TouchableOpacity>
					</View>
					<Text style={styles.profileName}>{profile.name}</Text>
					<Text style={styles.profileSubtitle}>{profile.role}</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F3F4F6",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 12,
		paddingVertical: 12,
		backgroundColor: "#F3F4F6",
	},
	logoText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#005C3A",
	},
	scrollContent: {
		paddingHorizontal: 16,
		paddingBottom: 40,
	},
	profileCard: {
		backgroundColor: "#FFFFFF",
		borderRadius: 16,
		alignItems: "center",
		paddingVertical: 24,
		paddingHorizontal: 16,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 10,
		elevation: 2,
	},
	imageWrapper: {
		position: "relative",
		marginBottom: 14,
	},
	profileAvatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
	cameraBtn: {
		position: "absolute",
		bottom: 0,
		right: 0,
		backgroundColor: "#005C3A",
		width: 32,
		height: 32,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 16,
		borderWidth: 2,
		borderColor: "#FFFFFF",
	},
	profileName: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#111827",
		marginBottom: 4,
	},
	profileSubtitle: {
		fontSize: 13,
		color: "#6B7280",
		marginBottom: 20,
	},
});
