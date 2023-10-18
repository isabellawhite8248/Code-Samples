#include "lightmodel.h"
#include <cmath>
#include <iostream>

// This file contains the phong function you need to fill in.
// This should be the ONLY file you modify.

//Task 2 answers:
//1. m is the total number of light sources on the scene and since it starts at i = 0, maybe we need to calculate it m
//times then sum them up for the value of a single pixel?
//2. material, scalar parameters needed for one calculation: k model parameter for each of the three terms
//a material property O, the total number of light sources on the scene m, n the specular exponent or shininess
//and fatt or the attenuation factor

// Helper function to convert illumination to RGBA, applying some form of tone-mapping (e.g. clamping) in the process
RGBA toRGBA(const glm::vec4 &illumination) {
    // Task 1
    //clamp between 0 and 1, then scale linearly to 0, 255 values store the value in an rgba struct and return
    float red, blue, green, op;
    for(int i = 0; i < 4; i++){
        float currEl = illumination[i];
        if(currEl < 0){
            currEl = 0;
        } else if (currEl > 1){
            currEl = 1;
        }

        //scale to 255
        switch (i) {
        case 0:
            red = currEl*255;
            break;
        case 1:
            blue = currEl*255;
            break;
        case 2:
            green = currEl*255;
            break;
        default: //the 4th value is opacity - just set to 255
            op = 255;
        }
    }
    return RGBA{(std::uint8_t)red, (std::uint8_t)blue, (std::uint8_t)green, (std::uint8_t)op};
}

// Calculates the RGBA of a pixel from intersection infomation and globally-defined coefficients
RGBA phong(glm::vec3  position,
           glm::vec3  normal,
           glm::vec3  directionToCamera,
           Material  &material,
           std::vector<LightInfo> &lights,
           Sampler   &reflectionSampler){

    // Normalizing directions
    normal            = glm::normalize(normal);
    directionToCamera = glm::normalize(directionToCamera);

    // Output illumination (we can ignore opacity)
    glm::vec4 illumination(0, 0, 0, 1);

    // Task 3: add the ambient term //the ka*Oa k = model paramenter representing ambient coefficient, material property of color channel
    illumination = ka*material.ambient + illumination;

    for (const LightInfo &light : lights) {

        glm::vec3 directionToLight = light.pos - position;;
        directionToLight = glm::normalize(directionToLight);

        glm::vec3 incomingLight = -directionToLight;
        incomingLight = glm::normalize(incomingLight);
        glm::vec3 reflectedIncomingLight = glm::reflect(incomingLight, normal);

        // Task 4, task 6: add the diffuse term
        float dotNL = glm::dot(normal, directionToLight);
        float dotRV = glm::dot(reflectedIncomingLight, directionToCamera);

        // Task 6: compute the attenuation factor
        float lx = light.pos[0];
        float ly = light.pos[1];
        float lz = light.pos[2];

        float ix = position[0];
        float iy = position[1];
        float iz = position[2];

        float diffx = (lx - ix)*(lx - ix);
        float diffy = (ly - iy)*(ly - iy);
        float diffz = (lz - iz)*(lz - iz);

        float distance = sqrt(diffx + diffy + diffz);
        float secondElement = 1/(c1 + (distance*c2) + (distance*distance*c3));

        float attenuation = fmin(1, secondElement);

        if(dotNL < 0){
            dotNL = 0;
        }
        if(dotRV < 0){
            dotRV = 0;
        }

        float specular = std::powf(dotRV, material.shininess);
        illumination = illumination + light.color*((kd*material.diffuse*dotNL));
        illumination +=  light.color*specular*ks*material.specular;


    }


    // Task 7: uncomment the following lines and correct the reflection term.
    //      The following code uses Sampler::getReflection(glm::vec3 startPosition, glm::vec3 lightDirection)
    //      to get the reflection intensity when "recursively raytracing" in some direction from some position

//    bug - formula is for reflecting an incoming ray - but this is an outgoing ray - direction from camera to the position?
    glm::vec3 reflectedRay = -directionToCamera - 2.f*glm::dot(-directionToCamera, normal)*normal; // <-- fix this calculation
    illumination += kr * reflectionSampler.getReflection(position, reflectedRay);   // <-- no need to edit this after uncommenting

    RGBA returnValue = toRGBA(illumination);
    return returnValue;
}
