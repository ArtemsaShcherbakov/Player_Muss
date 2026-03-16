import { useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";

interface Props {
  text: string;
  width: number;
}

const MarqueeText = ({ text, width }: Props) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (!textWidth) return;

    translateX.setValue(width);

    Animated.loop(
      Animated.timing(translateX, {
        toValue: -textWidth,
        duration: 8000,
        useNativeDriver: true,
      }),
    ).start();
  }, [textWidth]);

  return (
    <View
      style={{
        width,
        overflow: "hidden",
      }}
    >
      <Animated.Text
        numberOfLines={1}
        onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
        style={{
          transform: [{ translateX }],
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </Animated.Text>
    </View>
  );
};

export { MarqueeText };
