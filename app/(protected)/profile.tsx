import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Drawer from "expo-router/drawer";
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDrawer } from "../../src/admin/viewmodels/use-drawer";
import { useAuth } from "../../src/context/AuthContext";

export default function ProfileScreen() {
	const router = useRouter();
	const { profile } = useDrawer();
	const { user } = useAuth();

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
					<View style={styles.cardPoints}>
						<View style={[styles.cardPointBox, styles.cardOrderColor]}>
							<Text style={styles.cardBoxLabel}>orders</Text>
							<Text style={styles.cardBoxValue}>24</Text>
						</View>
						<View style={[styles.cardPointBox, styles.cardPointsColor]}>
							<Text style={styles.cardBoxLabel}>points</Text>
							<Text style={styles.cardBoxValue}>1250</Text>
						</View>
					</View>
				</View>
				<View style={styles.sectionCard}>
					<Text style={styles.personalHeader}>Personal Information</Text>
					<View style={styles.inputGroup}>
						<Text style={styles.inputLabel}>Full name</Text>
						<View style={styles.inputWrapper}>
							<Ionicons
								name="person-outline"
								size={20}
								style={styles.inputIcon}
							/>
							<TextInput
								style={styles.input}
								placeholder="Full name"
								value={user?.name ?? "Usuario no identificado"}
							/>
						</View>
					</View>
					<View style={styles.inputGroup}>
						<Text style={styles.inputLabel}>Email address</Text>
						<View style={styles.inputWrapper}>
							<Ionicons
								name="mail-outline"
								size={20}
								style={styles.inputIcon}
							/>
							<TextInput
								style={styles.input}
								placeholder="Email address"
								value={user?.email ?? "Sin correo electrónico"}
							/>
						</View>
					</View>
					<View style={styles.inputGroup}>
						<Text style={styles.inputLabel}>Phone number</Text>
						<View style={styles.inputWrapper}>
							<Ionicons
								name="call-outline"
								size={20}
								style={styles.inputIcon}
							/>
							<TextInput
								style={styles.input}
								placeholder="Phone number"
								keyboardType="phone-pad"
								value={user?.phone ?? "Sin número de teléfono"}
							/>
						</View>
					</View>
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
	cardPoints: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
	},
	cardPointBox: {
		flex: 1,
		height: 64,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: 6,
	},
	cardOrderColor: {
		backgroundColor: "#BEAFEE",
	},
	cardPointsColor: {
		backgroundColor: "#E2F0EC",
	},
	cardBoxLabel: {
		fontSize: 10,
		fontWeight: "bold",
		color: "#4B5563",
		letterSpacing: 1,
		marginBottom: 4,
	},
	cardBoxValue: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#047857",
	},
	sectionCard: {
		backgroundColor: "#FFFFFF",
		borderRadius: 16,
		padding: 16,
		marginBottom: 16,
		shadowColor: "#000000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.04,
		shadowRadius: 10,
		elevation: 2,
	},
	personalHeader: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#111827",
		marginBottom: 18,
	},
	inputGroup: {
		marginBottom: 14,
	},
	inputLabel: {
		fontSize: 10,
		fontWeight: "bold",
		color: "#4B5563",
		letterSpacing: 1,
		marginBottom: 6,
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#E5E7EB",
		borderRadius: 12,
		paddingHorizontal: 12,
		height: 48,
		backgroundColor: "#FFFFFF",
	},
	input: {
		flex: 1,
		fontSize: 15,
		color: "#1F2937",
		paddingVertical: 0,
	},
	inputIcon: {
		marginRight: 10,
	},
});
