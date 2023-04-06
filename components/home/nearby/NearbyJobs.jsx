import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hooks/useFetch";
import styles from "./nearbyjobs.style";

const NearbyJobs = () => {
  const router = useRouter();
  const { isLoading, data, error } = useFetch({
    endpoint: "search",
    queryObj: {
      query: "React developer",
      num_pages: "1",
    },
    delay: 3000,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Nearbyjobs error - {JSON.stringify(error)}</Text>
        ) : (
          data.map((job) => (
            <NearbyJobCard
              job={job}
              key={job.job_id || job}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default NearbyJobs;
