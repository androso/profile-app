import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { useState } from 'react';

import { useAuth } from '../../context/AuthContext';
import type { CreateProductRequest } from '../models/product.model';
import { ProductService } from '../service/product.service';

const DEFAULT_CATEGORY_ID = 1;

export function useCreateProduct() {
  const router = useRouter();
  const { token } = useAuth();

  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(DEFAULT_CATEGORY_ID);
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [regularPrice, setRegularPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [initialStock, setInitialStock] = useState('');
  const [minStockAlert, setMinStockAlert] = useState('');
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resetForm = () => {
    setName('');
    setCategoryId(DEFAULT_CATEGORY_ID);
    setSku('');
    setDescription('');
    setRegularPrice('');
    setOfferPrice('');
    setInitialStock('');
    setMinStockAlert('');
    setErrorMessage(null);
  };

  const submitProduct = async () => {
    if (isLoadingProduct) {
      return;
    }

    setErrorMessage(null);

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const trimmedRegularPrice = regularPrice.trim();
    const trimmedOfferPrice = offerPrice.trim();
    const trimmedInitialStock = initialStock.trim();
    const trimmedMinStockAlert = minStockAlert.trim();
    const parsedRegularPrice = Number(trimmedRegularPrice);
    const parsedOfferPrice =
      trimmedOfferPrice.length > 0 ? Number(trimmedOfferPrice) : undefined;
    const parsedInitialStock = Number(trimmedInitialStock);
    const parsedMinStockAlert = Number(trimmedMinStockAlert);

    if (!token?.trim()) {
      setErrorMessage('No se encontró el token de sesión. Inicia sesión nuevamente.');
      return;
    }

    if (!trimmedName) {
      setErrorMessage('Ingresa el nombre del producto.');
      return;
    }

    if (categoryId === null) {
      setErrorMessage('Selecciona una categoría para el producto.');
      return;
    }

    if (!trimmedDescription) {
      setErrorMessage('Ingresa la descripción del producto.');
      return;
    }

    if (
      !trimmedRegularPrice ||
      !Number.isFinite(parsedRegularPrice) ||
      parsedRegularPrice <= 0
    ) {
      setErrorMessage('Ingresa un precio regular válido mayor que cero.');
      return;
    }

    if (
      parsedOfferPrice !== undefined &&
      (!Number.isFinite(parsedOfferPrice) || parsedOfferPrice < 0)
    ) {
      setErrorMessage('Ingresa un precio de oferta válido.');
      return;
    }

    if (
      !trimmedInitialStock ||
      !Number.isInteger(parsedInitialStock) ||
      parsedInitialStock < 0
    ) {
      setErrorMessage('Ingresa un stock inicial entero igual o mayor que cero.');
      return;
    }

    if (
      !trimmedMinStockAlert ||
      !Number.isInteger(parsedMinStockAlert) ||
      parsedMinStockAlert < 0
    ) {
      setErrorMessage('Ingresa una alerta de stock mínimo entera igual o mayor que cero.');
      return;
    }

    const productRequest: CreateProductRequest = {
      name: trimmedName,
      categoryId,
      description: trimmedDescription,
      regularPrice: parsedRegularPrice,
      ...(parsedOfferPrice === undefined ? {} : { offerPrice: parsedOfferPrice }),
      initialStock: parsedInitialStock,
      minStockAlert: parsedMinStockAlert,
    };

    setIsLoadingProduct(true);

    try {
      const newProduct = await ProductService.createProduct(productRequest, token);

      Alert.alert(
        'Producto creado',
        `El producto ${newProduct.name} se creó correctamente.`,
        [
          {
            text: 'Aceptar',
            onPress: () => {
              resetForm();
              router.replace('/inventory');
            },
          },
        ],
      );
    } catch (error: unknown) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'No se pudo crear el producto.';
      setErrorMessage(message);
      console.error('[Products] Failed to create product:', message);
    } finally {
      setIsLoadingProduct(false);
    }
  };

  return {
    name,
    setName,
    categoryId,
    setCategoryId,
    sku,
    setSku,
    description,
    setDescription,
    regularPrice,
    setRegularPrice,
    offerPrice,
    setOfferPrice,
    initialStock,
    setInitialStock,
    minStockAlert,
    setMinStockAlert,
    isLoadingProduct,
    errorMessage,
    submitProduct,
  };
}
