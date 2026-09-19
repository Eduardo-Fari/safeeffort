import React ,{useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Accelerometer, Gyroscope} from 'expo-sensors';

export default function SensorMovimento(){
    //estado para dados tridimensionais
    const [dadosAcel, setDadosAcel] = useState({x: 0, y:0, z:0});
    const [dadosGiro, setDadosGiro] = useState({x:0, y:0, z:0});

    useEffect(() =>{
        //configura intervalo de mudança em dados

        Accelerometer.setUpdateInterval(500);
        Gyroscope.setUpdateInterval(500);
        //ouvintes de mudança
        const inscricaoAcel = Accelerometer.addListener(dados => setDadosAcel(dados));
        const inscricaoGiro = Gyroscope.addListener(dados => setDadosGiro(dados));

        //funcao de limpeza para remover ouvintes quando a tela for desmontada
        return () => {
            inscricaoAcel.remove();
            inscricaoGiro.remove();
        };
    }, []);

    return (
        <View style={screenLefttyles.container}>
            <View style={styles.blocoSensor}>
                <Text style={styles.tituloSensor}>Acelerometro (m/s2)</Text>
                <Text style={styles.textDados}>Eixo X: {dadosAcel.x.toFixed(2)}</Text>
                <Text style={styles.textDados}>Eixo y: {dadosAcel.y.toFixed(2)}</Text>
                <Text style={styles.textDados}>Eixo z: {dadosAcel.z.toFixed(2)}</Text>
            </View>
            <View style={styles.blocoSensor}>
                <Text style={styles.tituloSensor}>Giroscopio (rad/2)</Text>
                <Text style={styles.textDados}>Eixo X: {dadosGiro.x.toFixed(2)}</Text>
                <Text style={styles.textDados}>Eixo y: {dadosGiro.y.toFixed(2)}</Text>
                <Text style={styles.textDados}>Eixo z: {dadosGiro.z.toFixed(2)}</Text>
            </View>
        </View>
    );
}
    const styles = StyleSheet.create({
        container:{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#F5F5F5',
            padding: 20
        },
        blocoSensor: {
            backgroundColor: '#FFFFFF',
            padding: 20,
            borderRadius: 8,
            marginVertical: 10,
            elevation: 2
        },
        tituloSensor: {fontSize: 18,
            fontWeight: 'bold',
            marginBottom:10,
            color: '#5856D6'
        },
        textDados: {
            fontSize: 16,
            fontFamily: 'monospace', marginVertical: 2
        }
    });
