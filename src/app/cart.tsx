import { useState } from "react";
import { ProductCartProps, useCartStore } from "@/stores/cart-store";
import { View, Text, ScrollView, Alert, Linking } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { Button } from "@/components/button";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/components/link-button";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Input } from "@/components/input";
import { useNavigation } from "expo-router";

const WHATSAPP_NUMBER = "5583000000000" // Informe o número do WhatsApp para receber os pedidos


export default function Cart() {
  const [address, setAddress] = useState("");
  const navigation = useNavigation();
  const cartStore = useCartStore();
  
  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  );

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert(
      "Remover produto",
      `Deseja remover ${product.title} do carrinho?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => cartStore.remove(product.id),
        },
      ]
    );
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      Alert.alert(
        "Endereço de entrega",
        "Informe o endereço de entrega para continuar"
      );
      return;
    }

    const products = cartStore.products
      .map(
        (product) => `\n - ${product.title} (${product.quantity}x)`,
        `${total}`
      )
      .join("");

    const message = `
    🍔 NOVO PEDIDO
    \n Entregar em: ${address}
    \n_________________________________________
    ${products}

    \n_________________________________________
    \n Valor total: ${total}
    `;

    Linking.openURL(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${message}`);
    cartStore.clear();
    navigation.goBack();
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />

      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="p-5 flex-1">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {cartStore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductRemove(product)}
                  />
                ))}
                <View className="p-5 flex-row items-center justify-between">
                  <Text className="text-slate-100 text-lg font-bold">
                    Total
                  </Text>
                  <Text className="text-lime-400 text-lg font-bold">
                    {total}
                  </Text>
                </View>

                <Input
                  placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
                  returnKeyType="next"
                  onChangeText={setAddress}
                  blurOnSubmit={true}
                  onSubmitEditing={handleOrder}
                />
                <View className="p-5 gap-5">
                  <Button onPress={handleOrder}>
                    <Button.Text>Enviar pedido</Button.Text>
                    <Button.Icon>
                      <Feather name="arrow-right-circle" size={20} />
                    </Button.Icon>
                  </Button>
                </View>
              </View>
            ) : (
              <View className="p-5 flex-1 items-center justify-center">
                <Feather name="shopping-bag" size={64} color="#fff" />
                <Text className="text-slate-100 text-lg font-bold mt-4">
                  Seu carrinho está vazio
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
}
