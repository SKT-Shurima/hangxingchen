const fs = require('fs')
const path = require('path')
const https = require('https')

// Array of image URLs from download.js
const imageUrls = [
  'https://wx.qlogo.cn/mmopen/PiajxSqBRaELcngqqRHia2aiboy3unroHMhhKxib0hfmWzPfgAfm9wIyY8fTMnW5T1EthlnRf0ydmiaGVIDutxKbZAzxqPFDV0baibdcqdPJcvuY5BMS69mDdhQiaRtspbIVgic1/64',
  'https://wx.qlogo.cn/mmopen/PiajxSqBRaELcngqqRHia2aiboy3unroHMhhKxib0hfmWzPfgAfm9wIyY8fTMnW5T1EthlnRf0ydmiaGVIDutxKbZAzxqPFDV0baibdcqdPJcvuY5BMS69mDdhQiaRtspbIVgic1/0',
  'https://wx.qlogo.cn/mmopen/PiajxSqBRaELKdVssJ7byreDxYzkjNKnyfxhXkibdT8yQh3z1qugoSFl770jS1ZU1OQWia4RdmichtS8yvWNT8PYFpsuibcL5xnofD8TyZeVDPIGGGCMAROJAqkz8TI4XOzVo/64',
  'https://wx.qlogo.cn/mmopen/hkQ7ZjXbyefFMuB4pUnpjVJxu7IuEsicwgFELISw1WWSAzibtVibYY3lCy84mnial91IMy01W0KyY0FzOMC0HLpoibcHo1ZjCItcM9IjVh7zkaOYELhhUuEq3419ljln7ztA3/64',
  'https://wx.qlogo.cn/mmopen/KydxAIB52xnE5IgGDGuV0PPnBoqPBibWHc1TkYRdmV5Pweg8wGj6xr0coETMib8cMCrcPBgaBrfBu8k3tg2mJOkZyMmxZZvcM6/64',
  'https://wx.qlogo.cn/mmopen/hkQ7ZjXbyedzJf3GUMy3rlcpiabdqhC4b0owXvEsc7XRc4azxxvESE2htQQBDazteuSbr9pOcxqdDM3kMhias9ePuN6k8yjHZV9oYtnU92uH5fTjQ6LMINqicG0EjMj6mn1/64',
  'https://wx.qlogo.cn/mmopen/VtOPYdpyYwOJRzZqAagUQN6SunRIicSH2t9vhPiczsOt7X1l1NvtSxOdV9qDeNEMpKAc4B3epbscxv0BVZLmvtiaGopnzlAyqpN/64',
  'https://wx.qlogo.cn/mmopen/hkQ7ZjXbyefUr0AmHBpiaclwTnKnCZHwOVLwg0sMzh2HzDYsfh3GrIiarUICqPGhMWZj4CAwIofa2p4uZIvkU8hypIWibcmSRXXvpZb2Qw13qCMM0nE5X1WmMYvBBNWGuFw/64',
  'https://wx.qlogo.cn/mmopen/KydxAIB52xkRA33Q8XRM7LjiaTbgAbk90Qencw2ibxOot8AH70obRzAsjlGEYLicLYtRAaickXfG5KJgmO1mjhs5Rt7icNEFWDOHAPRLpG9WhzIO1JicUia7mxKWdAo8rXRdmSv/64',
  'https://wx.qlogo.cn/mmopen/ajNVdqHZLLCs2Fd7boibX8YEjH1ich2vMQUwTtcf3ZlzfuiaNRChrickVQUhDLFAiclQMNl5APrY8zY1oSjdKAggmYe4PZnE5daANBIMOZBgPcrGmpd0QzKgLTW9lXrIppRc5/64',
  'https://wx.qlogo.cn/mmopen/KydxAIB52xlP63oc9KQNbc9M25UnkSdaomrtl4BSz3zxOrflclyhG5kcqf3kkRTJnHVskb9roicy4JEynwiaXyBFDUofLicbicjmfWgz8Qhwe2icib8v0yRgM15WKic3deQSM5ib/64',
  'https://wx.qlogo.cn/mmopen/hkQ7ZjXbyee6FvNSDYWDicPszDIMfqSTM34D7QmxY9gUJmwyJzXyjmiaYEIXGb8W6k6dHgZu0R5DWVwufUXicQRFaLUqfvLr1aN/64',
  'https://wx.qlogo.cn/mmopen/ajNVdqHZLLCzCXxWvARdnS2pvnYric2mCnnSnhoK3WzY8dLgVeJsB5IsYdhGqtSNIH3edV4nuvMIj5RaQO0qJ2c0CgkAu3jE10Oo07kvVZiaib2xXic1Ota4xibW5RhtG3TXL/64',
  'https://wx.qlogo.cn/mmopen/hkQ7ZjXbyef0yjicuw16MHdf2WRPAgy3DPAst53dP4HyrNmslINVXWEburpAtWdRc06Wbruicf8u56J5nYicZgpcGSCH0fFfic9JmPKYkSgfPaV9FKliaPM6cECM1bwOOezO4/64',
  'https://wx.qlogo.cn/mmopen/PiajxSqBRaEIogobT7H2RtCYrb6rhvu4n0nTABqhSUiasa0ia1brZfg7gW55zRxlsqRbsEEdINgO1WNJNLyY81JqsBkNI3Lnn8cceiaeW3sAtJkbDbIMiax8u9Zic5944eMF8T/64',
  'https://wx.qlogo.cn/mmopen/hkQ7ZjXbyeeeicdbDafLQCzcqyXH9JpR8Kdib6vnbfZSorxiaOa7f5ptelDbuIU4S0oA5icVkiatpHr8kETdaW9r34QqT3CqxQx8rfk2Eziaeb0ynUNh0libfrPkfVxByQFsgyt/64',
  'https://wx.qlogo.cn/mmopen/PiajxSqBRaEIWXiamkVb72LhDicuRoCromsANVbCwGpY2C3Gnr1pWKoNNtjP4ableHePicvsNgdNR3kww7YgM8JXjkztohicv7IL0ERvjeibbCNxqQ6lH8knZpFsjibicoRTQ6ibl/64',
  'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBA2lXNUAWT18y7LGlFP9NtRdPwCuqRSroq6dcibfSaiccv11JJibeLwTpqULRibRLepicptbjxmu9dpKsC78F0KuhhW00OSNcBE2Qx3BpXmU51C4y6Jx4x50MicP/64',
  'https://wx.qlogo.cn/mmopen/KydxAIB52xmUgk5licqSdfEuhs8BIicibukYvJMwPicibbVPSlKkmQoOichovOM8xV6sNHvr2L9sER3ibGL09ZZ1d3gwJeiaedeVnN6kpw9gDX5H4EWoicYXGZpQElAZhibFTic8wOT/64',
  'https://wx.qlogo.cn/mmopen/PiajxSqBRaEIGo4DqOBMsXTuDIp58T4iaUzv4ibuYlK2dwDXN2yFDEXTluRuwnPaia1wGGpazZibVzwto8EuYLDnMDtNSDv2r7L0TMPicsQ4W5WGhmLNIFAWNCtHmqYzJxeh1T/64',
  'https://wx.qlogo.cn/mmopen/hkQ7ZjXbyeeT01ADibgoCRsPxyMias1lK6nRLXC5AcDkaAkuHRUdibeagwkMylKj7ib9jQ0ibRxe0kOTQzVlO8onmZj9fyJ2j9MpO/64',
  'https://wx.qlogo.cn/mmopen/PiajxSqBRaEKKzHWqIAX8ywVCRLDkIGbzica2OVs7wRdQOQqsyLIZd7byuObjGgglO3USAyMLOY8Ub46OSBUFKyk6O940Nlwpc2HNXS7icK4zIBwqMGrjy0WbTuBbC6qVs4/64',
  'https://wx.qlogo.cn/mmopen/ZrPbyo2gonDOa9uDLUKwtUO0GXkCfLEe3waibbib3bAVbHjiaPD3reBUNlibwicuSco2koiaaOw8lPH8LtoNeMJcd59eiaS8EWfrLPf5icibAIVYwlexR8nRHQqRFcTwvRp9iabSae/64',
  'https://wx.qlogo.cn/mmopen/KydxAIB52xljVeK2ia5I6ypTJcVrZQMNzDuIMibEQBfqXPQzwcqic8YMMUhsV7k25tBhA640I8JTjE1QlkA2GXFhgPHPZC3aHbVIhicfWsDuOW7adrVxa496L0gZlQSOx5kB/64',
  'https://wx.qlogo.cn/mmopen/ajNVdqHZLLB3hgZiaV470lVKricrsI3CzibTzdFjsu9pZcSzJUGV0kbib7fUMJt687CZsn6uGCpSxeL4tRoQ4ypUdzOKJDwxxicJ2Jqo3kNhmTpG16CQx5PRjmicWBaOQzia4iaM/64',
  'https://wx.qlogo.cn/mmopen/ajNVdqHZLLCPUUAQtLn3D7j9bTmFAsYB849WpLVFUQq6BuAicbJAcSPwniaoeAicyOUUNr2RVYyUfgLkEoJUvy7ibia2TnVibohQ4kwYZ28hwfgMnI31X3o7LTPXvAC2cNFPqh/64',
  'https://wx.qlogo.cn/mmopen/KydxAIB52xmRd2Il925WOyzQZh9UUg7yIrdssibmWuEGL958ibowBfUlSh8tTyPf0wiab7UQibicCmjlBxuDRkhSvHxdmAIqaR8pTYNJibzL6sZdyuXl8R4djCqLMpegRL5h6r/64',
  'https://wx.qlogo.cn/mmopen/KydxAIB52xn7HDXicafw9l0Anhp40IwcmSu4Riax7CaibHBCuibFSWMf82ItZrbq5BW7cLPSnjK7O8tS1vU92Jia6IqicDa4nt3jORkfT9ia4QybY46tSOnQwI4TRZmZia1TZGKS/64',
  'https://wx.qlogo.cn/mmopen/KydxAIB52xnD2QQS8nPexp8TYeTBItX8RhF6r1QwHSlPBSv7HM1zXaNg6pBl5Sgayc830rr8vfyHLFF2ulW9E0dhMKkRqwN3f4Q4Wicq0cAgMYD9FYe23PcNWAR97lvj6/64',
]

// Function to download an image and convert it to base64
function downloadImageAsBase64(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download image, status code: ${response.statusCode}`))
          return
        }

        const chunks = []
        response.on('data', (chunk) => chunks.push(chunk))
        response.on('end', () => {
          const buffer = Buffer.concat(chunks)
          const contentType = response.headers['content-type'] || 'image/jpeg'
          const base64 = buffer.toString('base64')
          resolve(`data:${contentType};base64,${base64}`)
        })
        response.on('error', reject)
      })
      .on('error', reject)
  })
}

// Main function to process all images
async function processImages() {
  try {
    console.log('Starting to download and convert images...')

    const profileImages = []

    // Process each image URL
    for (let i = 0; i < imageUrls.length; i++) {
      console.log(`Processing image ${i + 1}/${imageUrls.length}...`)
      try {
        const base64Data = await downloadImageAsBase64(imageUrls[i])
        profileImages.push({
          id: i + 1,
          base64: base64Data,
        })
      } catch (error) {
        console.error(`Error processing image ${i + 1}:`, error.message)
      }
    }

    // Create the output directory if it doesn't exist
    const outputDir = path.join(process.cwd(), 'public')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Write the JSON file
    const outputPath = path.join(outputDir, 'profile.json')
    fs.writeFileSync(outputPath, JSON.stringify(profileImages, null, 2))

    console.log(`Successfully saved ${profileImages.length} images to ${outputPath}`)
  } catch (error) {
    console.error('Error processing images:', error)
  }
}

// Run the main function
processImages()
